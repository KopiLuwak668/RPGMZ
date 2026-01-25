/*:
// =============================================================================
// KP_InputAlphabetMZ.js
// -----------------------------------------------------------------------------
// (c) 2026 KopiLuwak
// This software is released under the MIT License.
// http://opensource.org
// =============================================================================
 *
 * @target MZ
 * @plugindesc ダイヤル式アルファベット入力
 * @author KopiLuwak
 * @version 1.00
 *
 * @help
 * 【概要】
 * 横並びのダイヤルを回すようにアルファベットや数字を入力します。
 * 複数のパズルを個別の「識別名」で管理でき、連続したパスワード入力にも対応しています。
 *
 * 【使い方】
 * 1. プラグイン設定の「パズル全データの登録」にパズルを追加します。
 * 2. 「パズル識別名」に好きな名前（例：DoorA）を付けます。
 * 3. 「各桁の候補文字」に、その桁で選べる文字（例：ABC, 12345）を登録します。
 * ※「各桁の候補文字」は、カンマなどで区切らず直接入力してください。
 *
 * 4. イベントの「プラグインコマンド」から「開始」を選び、識別名と
 * 結果を格納する変数番号を指定して実行します。
 *
 * 【仕様と注意点】
 * ■桁数の決まり方
 * 「各桁の候補文字」を登録した「項目数」がそのまま桁数になります。
 * 10個登録すれば10桁、3個登録すれば3桁の入力ウィンドウが自動で作成されます。
 *
 * 【判定のコツ】
 * 入力終了後、指定した変数に結果が文字列として保存されます。
 * 「条件分岐」のスクリプトで以下のように判定してください：
 * $gameVariables.value(1) === "ABC"
 * （※大文字・小文字を区別しない場合は以下の通り）
 * $gameVariables.value(1).toLowerCase() === "abc"
 *
 * 【操作方法】
 * 左右キー：桁の移動
 * 上下キー：文字の切り替え
 * 決定キー：入力確定（全ての桁を決定してウィンドウを閉じます）
 *
 * 【利用規約】
 * MITライセンスに基づき、営利・非営利を問わず自由にご利用いただけます。
 * クレジット表記もこのヘッダーが残っていれば、ゲーム内への記載は任意です。
 *
 * 【更新履歴】
 * 26.01.25　v1.00　公開
 *
 * //=============================================================================
 *
 * @param allPuzzles
 * @text パズル全データの登録
 * @type struct<PuzzleGroup>[]
 * @desc 複数のパズルを個別に設定します。
 *
 * @command open
 * @text アルファベット入力の開始
 * @desc 指定した識別名のパズルを開始し、結果を変数に保存します。
 * @arg puzzleName
 * @text パズル識別名
 * @desc 設定画面で登録した「パズル識別名」を正確に入力してください。
 * @type string
 * @default DoorA
 * @arg variableId
 * @text 格納変数ID
 * @desc 入力結果（文字列）を保存する変数番号を指定します。
 * @type variable
 * @default 1
 */

/*~struct~PuzzleGroup:
 * @param name
 * @text パズル識別名
 * @desc 呼び出しに使う名前です（例：Password123）
 * @param digits
 * @text 各桁の候補文字
 * @type struct<DigitData>[]
 * @desc 登録した数だけ桁が増えます（3個登録すれば3桁）。
 */

/*~struct~DigitData:
 * @param data
 * @text 候補文字
 * @desc その桁で選択できる文字を直接入力してください（例：0123456789）
 */

(() => {
    'use strict';
    const pluginName = 'KP_InputAlphabetMZ';
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
                    return String(d.data || "").replace(/["']/g, "").trim().split('');
                });
            });
        } catch (e) {
            console.error("パズルデータの読み込みに失敗しました", e);
        }
        return puzzleMap;
    };

    PluginManager.registerCommand(pluginName, 'open', function(args) {
        const puzzleMap = loadPuzzleMap();
        const name = args.puzzleName;
        const lists = puzzleMap[name];
        
        if (lists && lists.length > 0 && SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.startAlphabetInput(Number(args.variableId), lists);
            this.setWaitMode('alphabetInput'); 
        }
    });

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'alphabetInput') {
            const scene = SceneManager._scene;
            if (scene instanceof Scene_Map && scene.isAlphabetInputActive()) {
                return true; 
            }
            this._waitMode = '';
        }
        return _Game_Interpreter_updateWaitMode.call(this);
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._alphabetInputWindow = new Window_AlphabetInput();
        this.addWindow(this._alphabetInputWindow);
    };

    Scene_Map.prototype.startAlphabetInput = function(vId, lists) {
        this._alphabetInputWindow.setup(vId, lists);
    };

    // ★重要：ここがエラーの原因でした。しっかり再定義します。
    Scene_Map.prototype.isAlphabetInputActive = function() {
        return this._alphabetInputWindow && 
                (this._alphabetInputWindow.active || 
                 this._alphabetInputWindow.isOpening() || 
                 this._alphabetInputWindow.isClosing());
    };

    class Window_AlphabetInput extends Window_Selectable {
        constructor() {
            super(new Rectangle(0, 0, 0, 0));
            this.openness = 0;
            this.deactivate();
            this._targetY = [];
            this._currentY = [];
        }

        setup(vId, lists) {
            this._variableId = vId;
            this._lists = lists;
            this._maxDigit = lists.length;
            this._values = new Array(this._maxDigit).fill(0);
            this._targetY = new Array(this._maxDigit).fill(0);
            this._currentY = new Array(this._maxDigit).fill(0);
            
            const charWidth = 64; 
            const padding = this.padding * 2;
            const w = (charWidth * this._maxDigit) + padding;
            // ダイヤル演出用に3行分の高さを確保
            const h = (this.lineHeight() * 3) + padding;
            
            this.move((Graphics.boxWidth - w) / 2, (Graphics.boxHeight - h) / 2, w, h);
            this.createContents();
            this.setHandler("ok", this.onInputOk.bind(this));
            this.setHandler("cancel", this.onInputOk.bind(this));
            
            this.refresh();
            this.select(0);
            this.open();
            this.activate();
        }

        update() {
            super.update();
            if (this.isOpen() && this.active) {
                this.updateAnimation();
                if (Input.isTriggered("ok")) this.callOkHandler();
            }
        }

        updateAnimation() {
            let needRefresh = false;
            for (let i = 0; i < this._maxDigit; i++) {
                if (Math.abs(this._currentY[i] - this._targetY[i]) > 0.01) {
                    this._currentY[i] += (this._targetY[i] - this._currentY[i]) * 0.2;
                    needRefresh = true;
                } else {
                    this._currentY[i] = this._targetY[i];
                }
            }
            if (needRefresh) this.refresh();
        }

        maxItems() { return this._maxDigit || 0; }
        maxCols() { return this._maxDigit || 1; }
        itemWidth() { return 64; }
        cursorUp() { this.changeChar(-1); }
        cursorDown() { this.changeChar(1); }

        changeChar(delta) {
            const list = this._lists[this.index()];
            if (!list || list.length === 0) return;
            
            // 1. 確定値を更新
            this._values[this.index()] = (this._values[this.index()] + delta + list.length) % list.length;
            // 2. 目標アニメーション値を更新（今の位置からの相対移動）
            this._targetY[this.index()] += delta;
            
            this.playCursorSound();
        }

        onInputOk() {
            const result = this._values.map((v, i) => this._lists[i][v] || "").join("");
            $gameVariables.setValue(this._variableId, result);
            this.playOkSound();
            this.close();
            this.deactivate();
        }

        drawItem(index) {
            const rect = this.itemLineRect(index);
            const list = this._lists[index];
            const lh = this.lineHeight();
            const centerY = lh * 1.35; 

            // ★ここが修正のキモ：
            // baseIdx（どの文字を描くか）は _values（確定値）を基準にする
            // offset（どれだけズレて描くか）は currentY と targetY の差分から計算する
            const baseIdx = this._values[index];
            const animeOffset = (this._currentY[index] - this._targetY[index]) * lh;

            for (let i = -2; i <= 2; i++) {
                // リストの範囲内に収める計算
                const drawIdx = (baseIdx + i + list.length * 1000) % list.length;
                const char = list[drawIdx] || "";
                
                // animeOffset を足すことで、滑らかに移動する
                const ty = centerY - (i * lh) + animeOffset;
                
                const distanceFromCenter = Math.abs(ty - centerY);
                const opacity = Math.max(0, 255 - (distanceFromCenter / lh) * 180);
                
                if (ty > -lh && ty < this.height) {
                    this.changePaintOpacity(opacity > 40);
                    
                    if (opacity > 200) {
                        this.contents.fontSize = 32;
                        this.changeTextColor(ColorManager.textColor(14)); // 濃い黄色
                    } else {
                        this.contents.fontSize = 20;
                        this.resetTextColor();
                    }

                    this.drawText(char, rect.x, ty, rect.width, 'center');
                    this.resetTextColor();
                }
            }
        }
        
        itemRect(index) {
            const rect = super.itemRect(index);
            rect.y = this.lineHeight() * 1.35; 
            return rect;
        }
    }

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if (SceneManager._scene instanceof Scene_Map && SceneManager._scene.isAlphabetInputActive()) return false;
        return _Game_Player_canMove.call(this);
    };
})();