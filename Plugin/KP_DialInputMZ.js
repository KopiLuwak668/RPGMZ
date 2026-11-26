/*:
// =============================================================================
// KP_DialInputMZ.js
// -----------------------------------------------------------------------------
// (c) 2026 KopiLuwak
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// =============================================================================
 *
 * @target MZ
 * @plugindesc ダイヤル式文字列・絵文字入力（数値入力の文字列版）
 * @author KopiLuwak
 * @version 1.00
 *
 * @help
 * 【概要】
 * RPGツクールMZの「数値入力の処理」の代わりに、3Dシリンダー風のダイヤルを回して
 * 文字列や数字、絵文字を入力するプラグインです。
 * 複数のパズルを個別の「識別名」で管理でき、連続したパスワード入力にも対応しています。
 *
 * 【使い方】
 * 1. プラグイン設定の「パズル全データの登録」にパズルを追加します。
 * 2. 「パズル識別名」に好きな名前（例：DoorA）を付けます。
 * 3. 「各桁の候補文字」に、その桁で選べる文字（例：ABC, 12345, 🐶🐱🐭🐹）を登録します。
 * ※「各桁の候補文字」は、カンマなどで区切らず直接入力してください。
 * ※動物の絵文字などのサロゲートペア文字も1文字として正しく認識されます。
 *
 * 4. イベントの「プラグインコマンド」から「文字列入力の開始」を選び、
 *    識別名とウィンドウ背景タイプを指定して実行します。
 *
 * 【仕様と注意点】
 * ■桁数の決まり方
 * 「各桁の候補文字」を登録した「項目数」がそのまま桁数になります。
 * 10個登録すれば10桁、3個登録すれば3桁の入力ウィンドウが自動で作成されます。
 *
 * 【判定のコツ】
 * 入力終了後、条件分岐のスクリプト等で puzzle(x) を使って正誤判定できます。
 * 例：puzzle("DoorA") または puzzle(1)
 *
 * 【操作方法】
 * 左右キー / クリック・タップ：桁の移動（即座に選択枠が切り替わります）
 * 上下キー / マウスホイール / 上下ドラッグ(スワイプ)：ダイヤルの回転
 * 決定キー / 選択中の桁の中央タップ：入力確定（全ての桁を決定してウィンドウを閉じます）
 *
 * 【利用規約】
 * MITライセンスに基づき、営利・非営利を問わず自由にご利用いただけます。
 * クレジット表記もこのヘッダーが残っていれば、ゲーム内への記載は任意です。
 *
 * 【更新履歴】
 * 26.11.27 v1.00 初回公開
 *
 * //=============================================================================
 *
 * @param allPuzzles
 * @text パズル全データの登録
 * @type struct<PuzzleGroup>[]
 * @desc 複数のパズルを個別に設定します。
 *
 * @command open
 * @text 文字列入力の開始
 * @desc 指定した識別名のパズルを開始します。
 *
 * @arg puzzleName
 * @text パズル識別名
 * @desc 設定画面で登録した「パズル識別名」を正確に入力してください。
 * @type string
 * @default DoorA
 *
 * @arg backgroundType
 * @text ウィンドウ背景
 * @desc 入力ウィンドウの背景タイプを選択します。
 * @type select
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default 0
 */

/*~struct~PuzzleGroup:
 * @param name
 * @text パズル識別名
 * @desc 呼び出しに使う名前です（例：Password123）
 * @param answer
 * @text 正解文字列
 * @desc puzzle(x) で判定するときの正解文字列です。
 * @type string
 * @default
 * @param digits
 * @text 各桁の候補文字
 * @type struct<DigitData>[]
 * @desc 登録した数だけ桁が増えます（3個登録すれば3桁）。
 */

/*~struct~DigitData:
 * @param data
 * @text 候補文字
 * @desc その桁で選択できる文字を直接入力してください（例：0123456789、🐶🐱🐭）
 */

(() => {
    'use strict';
    const pluginName = 'KP_DialInputMZ';
    const params = PluginManager.parameters(pluginName);

    const loadPuzzleMap = () => {
        const puzzleMap = {};
        try {
            const groups = JSON.parse(params.allPuzzles || "[]");
            groups.forEach(gStr => {
                const group = JSON.parse(gStr);
                const digits = JSON.parse(group.digits || "[]");
                const name = group.name;
                puzzleMap[name] = digits.map(dStr => {
                    const d = JSON.parse(dStr);
                    return Array.from(String(d.data || "").replace(/["']/g, "").trim());
                });
            });
        } catch (e) {
            console.error("パズルデータの読み込みに失敗しました", e);
        }
        return puzzleMap;
    };

    const loadPuzzleGroups = () => {
        try {
            const groups = JSON.parse(params.allPuzzles || "[]");
            return groups.map(gStr => {
                const group = JSON.parse(gStr);
                return {
                    name: group.name,
                    answer: String(group.answer || "")
                };
            });
        } catch (e) {
            console.error("パズル正解データの読み込みに失敗しました", e);
            return [];
        }
    };

    window.puzzle = function(key) {
        const groups = loadPuzzleGroups();
        let target = null;

        if (typeof key === 'number') {
            target = groups[key - 1] || null;
        } else if (typeof key === 'string') {
            target = groups.find(g => g.name === key) || null;
        }

        if (!target || !target.answer) return false;
        const lastResults = ($gameSystem && $gameSystem._kpDialInputResults) || {};
        return lastResults[target.name] === target.answer;
    };

    PluginManager.registerCommand(pluginName, 'open', function(args) {
        const puzzleMap = loadPuzzleMap();
        const name = args.puzzleName;
        const backgroundType = Number(args.backgroundType ?? 0);
        const lists = puzzleMap[name];

        if (lists && lists.length > 0 && SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.startDialInput(lists, name, backgroundType);
            this.setWaitMode('dialInput');
        }
    });

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'dialInput') {
            const scene = SceneManager._scene;
            if (scene instanceof Scene_Map && scene.isDialInputActive()) {
                return true;
            }
            this._waitMode = '';
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._dialInputWindow = new Window_DialInput();
        this.addWindow(this._dialInputWindow);
    };

    Scene_Map.prototype.startDialInput = function(lists, puzzleName = "", backgroundType = 0) {
        this._dialInputWindow.setup(lists, puzzleName, backgroundType);
    };

    Scene_Map.prototype.isDialInputActive = function() {
        return this._dialInputWindow &&
                (this._dialInputWindow.active ||
                 this._dialInputWindow.isOpening() ||
                 this._dialInputWindow.isClosing());
    };

    class Window_DialInput extends Window_Selectable {
        constructor() {
            super(new Rectangle(0, 0, 0, 0));
            this.openness = 0;
            this.deactivate();
            this._targetY = [];
            this._currentY = [];
            this._touchState = {
                active: false,
                digitIndex: -1,
                startY: 0,
                lastStepY: 0,
                dragged: false
            };
        }

        setup(lists, puzzleName = "", backgroundType = 0) {
            this._lists = lists;
            this._puzzleName = puzzleName;
            this._maxDigit = lists.length;
            this._values = new Array(this._maxDigit).fill(0);
            this._targetY = new Array(this._maxDigit).fill(0);
            this._currentY = new Array(this._maxDigit).fill(0);
            this._touchState = {
                active: false,
                digitIndex: -1,
                startY: 0,
                lastStepY: 0,
                dragged: false
            };

            const charWidth = this.itemWidth();
            const padding = this.padding * 2;
            const w = (charWidth * this._maxDigit) + padding;
            const h = (this.lineHeight() * 4) + padding;

            this.move((Graphics.boxWidth - w) / 2, (Graphics.boxHeight - h) / 2, w, h);
            this.setBackgroundType(backgroundType);
            this.createContents();
            this.setHandler("ok", this.onInputOk.bind(this));
            this.setHandler("cancel", this.onInputOk.bind(this));

            this.select(0);
            this.refresh();
            this.open();
            this.activate();
        }

        update() {
            super.update();
            if (this.isOpen() && this.active) {
                this.updateDialTouchAndWheel();
                this.updateAnimation();
                if (Input.isTriggered("ok")) {
                    this.callOkHandler();
                }
            }
        }

        updateAnimation() {
            let needRefresh = false;
            for (let i = 0; i < this._maxDigit; i++) {
                const diff = this._targetY[i] - this._currentY[i];
                if (Math.abs(diff) > 0.005) {
                    this._currentY[i] += diff * 0.25;
                    needRefresh = true;
                } else if (this._currentY[i] !== this._targetY[i]) {
                    this._currentY[i] = this._targetY[i];
                    needRefresh = true;
                }
            }
            if (needRefresh) {
                this.refresh();
            }
        }

        maxItems() {
            return this._maxDigit || 0;
        }

        maxCols() {
            return this._maxDigit || 1;
        }

        itemWidth() {
            return 68;
        }

        itemHeight() {
            return this.innerHeight;
        }

        colSpacing() {
            return 0;
        }

        rowSpacing() {
            return 0;
        }

        select(index) {
            const prevIndex = this.index();
            super.select(index);
            if (prevIndex !== this.index() && this.contents) {
                this.refresh();
            }
        }

        cursorUp() {
            this.changeChar(1, this.index());
        }

        cursorDown() {
            this.changeChar(-1, this.index());
        }

        changeChar(delta, targetIndex = this.index()) {
            const list = this._lists[targetIndex];
            if (!list || list.length === 0) return;

            this._values[targetIndex] = (this._values[targetIndex] + delta + list.length) % list.length;
            this._targetY[targetIndex] += delta;

            this.playCursorSound();
            this.refresh();
        }

        processTouch() {
            // updateDialTouchAndWheel() で処理するため空オーバーライド
        }

        hitTestDigit(x, y) {
            const cx = x - this.x - this.padding;
            const cy = y - this.y - this.padding;
            if (cx < 0 || cy < 0 || cx >= this.innerWidth || cy >= this.innerHeight) {
                return -1;
            }
            const index = Math.floor(cx / this.itemWidth());
            return index >= 0 && index < this._maxDigit ? index : -1;
        }

        updateDialTouchAndWheel() {
            if (TouchInput.wheelY !== 0) {
                const hoverIndex = this.hitTestDigit(TouchInput.x, TouchInput.y);
                const targetIndex = hoverIndex >= 0 ? hoverIndex : this.index();
                if (hoverIndex >= 0 && hoverIndex !== this.index()) {
                    this.select(hoverIndex);
                }
                const delta = TouchInput.wheelY > 0 ? -1 : 1;
                this.changeChar(delta, targetIndex);
            }

            if (TouchInput.isTriggered()) {
                const hitIndex = this.hitTestDigit(TouchInput.x, TouchInput.y);
                if (hitIndex >= 0) {
                    this._touchState.active = true;
                    this._touchState.digitIndex = hitIndex;
                    this._touchState.startY = TouchInput.y;
                    this._touchState.lastStepY = TouchInput.y;
                    this._touchState.dragged = false;

                    if (hitIndex !== this.index()) {
                        this.select(hitIndex);
                        this.playCursorSound();
                    }
                }
            }

            if (this._touchState.active && TouchInput.isPressed()) {
                const dyFromStart = TouchInput.y - this._touchState.startY;
                if (Math.abs(dyFromStart) > 8) {
                    this._touchState.dragged = true;
                }

                const stepThreshold = 28;
                const dyStep = TouchInput.y - this._touchState.lastStepY;
                if (Math.abs(dyStep) >= stepThreshold) {
                    const steps = Math.trunc(dyStep / stepThreshold);
                    this.changeChar(-steps, this._touchState.digitIndex);
                    this._touchState.lastStepY += steps * stepThreshold;
                }
            }

            if (this._touchState.active && TouchInput.isReleased()) {
                if (!this._touchState.dragged) {
                    const releaseIndex = this.hitTestDigit(TouchInput.x, TouchInput.y);
                    const totalMove = Math.abs(TouchInput.y - this._touchState.startY);
                    if (releaseIndex === this._touchState.digitIndex && totalMove <= 8) {
                        const localY = TouchInput.y - this.y - this.padding;
                        const centerY = this.innerHeight / 2;
                        const slitHalf = this.lineHeight() * 0.65;
                        if (Math.abs(localY - centerY) <= slitHalf) {
                            this.callOkHandler();
                        } else {
                            const dir = localY < centerY ? 1 : -1;
                            this.changeChar(dir, releaseIndex);
                        }
                    }
                }
                this._touchState.active = false;
                this._touchState.digitIndex = -1;
                this._touchState.dragged = false;
            }
        }

        onInputOk() {
            const result = this._values.map((v, i) => this._lists[i][v] || "").join("");
            if (this._puzzleName && $gameSystem) {
                $gameSystem._kpDialInputResults = $gameSystem._kpDialInputResults || {};
                $gameSystem._kpDialInputResults[this._puzzleName] = result;
            }
            this.playOkSound();
            this.close();
            this.deactivate();
        }

        refreshCursor() {
            this.setCursorRect(0, 0, 0, 0);
        }

        updateCursor() {
            this.setCursorRect(0, 0, 0, 0);
        }

        _updateCursor() {
            if (this._cursorSprite) {
                this._cursorSprite.visible = false;
            }
        }

        drawItemBackground(index) {
            const rect = this.itemRect(index);
            const ctx = this.contents.context;
            const isSelected = (index === this.index());
            const padX = 4;
            const padY = 4;
            const x = rect.x + padX;
            const y = rect.y + padY;
            const w = rect.width - padX * 2;
            const h = rect.height - padY * 2;

            ctx.save();

            const grad = ctx.createLinearGradient(x, y, x, y + h);
            grad.addColorStop(0.00, "rgba(8, 10, 16, 0.94)");
            grad.addColorStop(0.24, "rgba(28, 33, 46, 0.84)");
            grad.addColorStop(0.50, "rgba(56, 64, 84, 0.88)");
            grad.addColorStop(0.76, "rgba(28, 33, 46, 0.84)");
            grad.addColorStop(1.00, "rgba(8, 10, 16, 0.94)");

            ctx.fillStyle = grad;
            ctx.fillRect(x, y, w, h);

            const sideGrad = ctx.createLinearGradient(x, y, x + w, y);
            sideGrad.addColorStop(0.00, "rgba(0, 0, 0, 0.48)");
            sideGrad.addColorStop(0.16, "rgba(0, 0, 0, 0.0)");
            sideGrad.addColorStop(0.84, "rgba(0, 0, 0, 0.0)");
            sideGrad.addColorStop(1.00, "rgba(0, 0, 0, 0.48)");
            ctx.fillStyle = sideGrad;
            ctx.fillRect(x, y, w, h);

            ctx.strokeStyle = "rgba(130, 145, 170, 0.30)";
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

            const slitH = this.lineHeight() + 8;
            const slitY = Math.round(y + (h - slitH) / 2);

            if (isSelected) {
                ctx.fillStyle = "rgba(255, 224, 96, 0.16)";
                ctx.fillRect(x, slitY, w, slitH);

                ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
                ctx.lineWidth = 4;
                ctx.strokeRect(x + 1, slitY + 1, w - 2, slitH - 2);

                ctx.strokeStyle = "#ffd84d";
                ctx.lineWidth = 2;
                ctx.strokeRect(x + 1, slitY + 1, w - 2, slitH - 2);
            } else {
                ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
                ctx.fillRect(x + 1, slitY, w - 2, slitH);

                ctx.strokeStyle = "rgba(160, 175, 200, 0.25)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x + 1, slitY + 0.5);
                ctx.lineTo(x + w - 1, slitY + 0.5);
                ctx.moveTo(x + 1, slitY + slitH - 0.5);
                ctx.lineTo(x + w - 1, slitY + slitH - 0.5);
                ctx.stroke();
            }

            ctx.restore();
            this.contents._baseTexture.update();
        }

        drawItem(index) {
            const rect = this.itemRect(index);
            const list = this._lists[index];
            if (!list || list.length === 0) return;

            const isSelected = (index === this.index());
            const centerY = rect.y + rect.height / 2;
            const radius = rect.height * 0.44;
            const stepAngle = Math.PI / 4.2;

            const baseIdx = this._values[index];
            const scrollOffset = this._targetY[index] - this._currentY[index];

            const ctx = this.contents.context;
            ctx.save();
            ctx.beginPath();
            ctx.rect(rect.x + 4, rect.y + 4, rect.width - 8, rect.height - 8);
            ctx.clip();

            const drawOrder = [-2, 2, -1, 1, 0];

            for (const i of drawOrder) {
                const theta = (i + scrollOffset) * stepAngle;
                if (Math.abs(theta) >= Math.PI * 0.48) continue;

                const drawIdx = (baseIdx + i + list.length * 1000) % list.length;
                const char = list[drawIdx] || "";

                const sinT = Math.sin(theta);
                const cosT = Math.cos(theta);

                const yPos = centerY + sinT * radius;
                const scaleY = Math.max(0.35, cosT);
                const scaleX = 0.78 + 0.22 * cosT;
                const alpha = Math.max(0.18, Math.pow(cosT, 1.35));

                const isCenterChar = (Math.abs(theta) < stepAngle * 0.45);
                const baseFontSize = isCenterChar ? 30 : 24;

                ctx.save();
                ctx.translate(rect.x + rect.width / 2, yPos);
                ctx.scale(scaleX, scaleY);
                ctx.globalAlpha = alpha;

                ctx.font = `${isCenterChar ? "bold " : ""}${baseFontSize}px ${$gameSystem.mainFontFace()}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.lineWidth = isCenterChar ? 4 : 3;
                ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
                ctx.strokeText(char, 0, 1);

                if (isCenterChar && isSelected) {
                    ctx.fillStyle = ColorManager.textColor(14);
                } else if (isCenterChar) {
                    ctx.fillStyle = "#ffffff";
                } else {
                    ctx.fillStyle = "#cfd8e8";
                }
                ctx.fillText(char, 0, 1);

                ctx.restore();
            }

            ctx.restore();
            this.contents._baseTexture.update();
        }
    }

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if (SceneManager._scene instanceof Scene_Map && SceneManager._scene.isDialInputActive()) {
            return false;
        }
        return _Game_Player_canMove.call(this);
    };
})();