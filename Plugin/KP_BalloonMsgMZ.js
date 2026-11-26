/*:
 * @target MZ
 * @plugindesc Balloon Message v1.0.0
 * @author Kopi Luwak
 *
 * @command enableBalloonDefault
 * @text Enable Balloon Mode (Default)
 * @desc Enables balloon mode with default settings.
 *
 * @arg characterId
 * @type string
 * @default 0
 * @text Target Character ID
 * @desc -1:Player, 0:This Event, 1+:Event ID, \V[n] (n = variable ID) 
 *
 * @arg showTail
 * @type boolean
 * @default true
 * @text Show Tail
 * @desc Show or hide the balloon tail.
 *
 * @command enableBalloon
 * @text Enable Balloon Mode (Custom)
 * @desc Enables balloon mode with custom settings.
 *
 * @arg characterId
 * @type string
 * @default 0
 * @text Target Character ID
 * @desc -1:Player, 0:This Event, 1+:Event ID, \V[n] (n = variable ID) 
 *
 * @arg showTail
 * @type boolean
 * @default true
 * @text Show Tail
 * @desc Show or hide the balloon tail.
 *
 * @arg position
 * @type select
 * @option Auto
 * @value 0
 * @option Above
 * @value 1
 * @option Below
 * @value 2
 * @option Center
 * @value 3
 * @default 0
 * @text Position
 *
 * @arg offsetX
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text Offset X
 * @desc Negative = left, Positive = right.
 *
 * @arg offsetY
 * @type number
 * @min -9999
 * @max 9999
 * @default -16
 * @text Offset Y
 * @desc Negative = up (when above or center). Reversed automatically when below.
 *
 * @arg fontSize
 * @type number
 * @min -99
 * @max 99
 * @default 0
 * @text Font Size Offset
 * @desc Added to the database font size (26 by default). e.g. 2 = 28, -2 = 24.
 *
 * @arg fontBold
 * @type boolean
 * @default true
 * @text Font Bold
 * @desc Makes the text bold.
 *
 * @arg fontItalic
 * @type boolean
 * @default false
 * @text Font Italic
 * @desc Makes the text italic.
 *
 * @arg customW
 * @type number
 * @default 0
 * @text Width (chars, 0=auto)
 * @desc 1 = one font size wide (about one full-width character or two letters). 0 = auto fit to text.
 *
 * @arg customH
 * @type number
 * @default 0
 * @min -1
 * @max 20
 * @text Height (lines, 0=auto)
 * @desc -1 = fit text, up to the screen. 0 = fit text, up to 4 lines. Text that does not fit goes to the next page.
 *
 * @arg centerV
 * @type boolean
 * @default false
 * @text Center Vertically
 * @desc Places the text in the vertical middle of the balloon.
 *
 * @arg maxChoices
 * @type number
 * @min 1
 * @max 6
 * @default 3
 * @text Visible Choices
 * @desc Number of choices shown at once. Extra choices scroll.
 *
 * @arg fitChoiceW
 * @type boolean
 * @default true
 * @text Fit Choice Width
 * @desc Makes the choice window as wide as the balloon.
 *
 * @arg focusSpeaker
 * @type boolean
 * @default false
 * @text Focus on Speaker
 * @desc Moves the camera to center on the speaker. Returns to the player when the event ends.
 *
 * @arg se
 * @text Balloon SE
 * @type struct<SE>
 * @default {"name":"Cursor1","volume":"90","pitch":"100","pan":"0"}
 * @desc SE played per character. Leave name blank to disable.
 *
 * @command disableBalloon
 * @text Disable Balloon Mode
 * @desc Returns to the normal message window in the middle of an event.
 *
 * @help
 * =================================================================
 *   ATTENTION
 * =================================================================
 *  This plugin was developed in collaboration with Gemini / Claude 
 *  as coding partners.
 *  
 * =================================================================
 *   Balloon Message v1.0.0
 * =================================================================
 *  Shows the message window as a speech balloon attached to a
 *  character, and adds <B> <I> <U> text tags to every window.
 *  
 * -----------------------------------------------------------------
 *   Plugin Command: Enable Balloon Mode (Default / Custom)
 * -----------------------------------------------------------------
 *  Every Show Text after this command is drawn as a balloon until
 *  the event ends. Balloon mode is turned off automatically when
 *  the event finishes, so no Disable command is needed at the end.
 *  Parallel events and common event calls do not turn it off.
 *  
 *  Default sets only Target Character ID and Show Tail and uses
 *  the default values for the rest. Custom sets every item below.
 *  
 *    Target Character ID  -1 = player, 0 = this event, 1+ = event
 *                         ID. \V[n] reads the ID from variable n.
 *    Show Tail            Draw the tail pointing at the character.
 *    Position             Auto / Above / Below the character.
 *                         Auto: below when the character stands
 *                         lower than the player (talked to from
 *                         above), otherwise above. If it does not
 *                         fit on the screen, the other side is used.
 *                         Center: the middle of the screen, for
 *                         notices not tied to a speaker. Offset X / Y
 *                         shift it from the middle (Y: + is down).
 *    Offset X / Offset Y  Shift in pixels. Y is measured upward
 *                         when Above and flipped when Below.
 *    Font Size Offset     Added to the font size set in
 *                         Database > System 2 (26 by default).
 *    Font Bold / Italic   Default style for the balloon text.
 *    Width (chars)        Fixed width. 1 = one font size wide, about
 *                         one full-width character or two letters.
 *                         0 = fit text.
 *                         The balloon is never wider than the screen.
 *                         Lines that do not fit wrap to the next line.
 *    Height (lines)       Fixed height in lines (1 to 20).
 *                         0 = fit text, up to 4 lines.
 *                         -1 = fit text, up to what fits on the
 *                         screen. The height never goes past what
 *                         fits on the screen, and text that does
 *                         not fit continues on the next page.
 *                         Default command uses 0.
 *    Center Vertically    Places the text in the vertical middle of
 *                         the balloon.
 *    Visible Choices      Choices shown at once (1 to 6). Extra
 *                         choices scroll. Default command uses 3.
 *    Fit Choice Width     Makes the choice window as wide as the
 *                         balloon. Default command uses true.
 *    Focus on Speaker     Moves the camera to center on the
 *                         character first. When the event ends, the
 *                         camera returns to the player, and the
 *                         player cannot act until it is back.
 *                         Default command uses false.
 *    Balloon SE           Sound played for each character typed.
 *                         Leave the name blank for silence.
 *  
 *  Plugin Command: Disable Balloon Mode
 *    Returns to the normal message window in the middle of an event.
 *    Use Enable again to switch back to balloons.
 *  
 * -----------------------------------------------------------------
 *   Consecutive Show Text
 * -----------------------------------------------------------------
 *  When Height (lines) is set to -1 or 5 or higher in Enable Balloon
 *  Mode (Custom), consecutive Show Text commands are joined into
 *  one balloon. The face, name, background and position of the first
 *  one are used. To start a new balloon, leave the last line of a
 *  Show Text empty. The empty line itself is not shown.
 *  When using Enable Balloon Mode (Default) or when Height (lines)
 *  is 0 to 4, Show Text commands are not joined.
 *  
 * -----------------------------------------------------------------
 *   Choices
 * -----------------------------------------------------------------
 *  A Show Choices right after a Show Text opens together with the
 *  balloon and is attached below the text. Labels, Comments and
 *  Jump to Label may be placed between them; any other command
 *  makes the choices appear on their own.
 *  The choice window is never wider than the balloon, and longer
 *  choices are cut off. When it is narrower, the Show Choices
 *  position (left / center / right) aligns it to the balloon.
 *  The choices can be selected once the text has been shown.
 *  
 *  A Show Choices with no Show Text right before it is placed next
 *  to the target character:
 *    Auto    Below if the character is in the upper half of the
 *            screen, above if in the lower half.
 *    Above   Above the character's head.
 *    Below   Below the character's feet.
 *    Center  The middle of the screen.
 *  The horizontal position follows the Show Choices setting
 *  (left / center / right). Visible Choices sets how many choices
 *  are shown at once; extra choices scroll.
 *  
 * -----------------------------------------------------------------
 *   Text Tags (all windows)
 * -----------------------------------------------------------------
 *  These work in any text drawn by a window, not only balloons:
 *  
 *    <B>bold</B>        <I>italic</I>        <U>underline</U>
 *  
 *  In Show Text, these also align the lines they are on:
 *  
 *    <ct>centered</ct>  <rt>right-aligned</rt>
 *  
 *  Closing </B> or </I> returns to the balloon's Font Bold / Italic
 *  setting while a balloon is shown, otherwise to normal text.
 *  To print a literal < >, double the brackets:
 *  <<like this>> is shown as <like this>.
 *  
 *  The colors of the balloon, the tail and the choice window are
 *  set at the top of the code in this file.
 *  
 * =================================================================
 *   License
 * =================================================================
 *  Copyright (c) 2026 Kopi Luwak
 *
 *  MIT License
 *
 *  This plugin is distributed under the MIT License.
 *  See the GitHub repository for the full license:
 *  https://github.com/KopiLuwak668/KP_BalloonMsgMZ
 *
 *  Copyright and license notices must be retained when redistributing.
 */
/*~struct~SE:
 * @param name
 * @text File Name
 * @type file
 * @dir audio/se
 * @default 
 *
 * @param volume
 * @text Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param pan
 * @text Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */

/*:ja
 * @target MZ
 * @plugindesc 吹き出しメッセージ v1.0.0
 * @author Kopi Luwak
 *
 * @command enableBalloonDefault
 * @text 吹き出しモード開始（標準）
 * @desc 標準の設定で吹き出しモードを始めます。
 *
 * @arg characterId
 * @type string
 * @default 0
 * @text 対象キャラクターID
 * @desc -1:プレイヤー、0:このイベント、1以上:イベントID、\V[n]（n = 変数番号）
 *
 * @arg showTail
 * @type boolean
 * @default true
 * @text テールを表示
 * @desc 吹き出しのテールを表示します。
 *
 * @command enableBalloon
 * @text 吹き出しモード開始（詳細）
 * @desc 細かく設定して吹き出しモードを始めます。
 *
 * @arg characterId
 * @type string
 * @default 0
 * @text 対象キャラクターID
 * @desc -1:プレイヤー、0:このイベント、1以上:イベントID、\V[n]（n = 変数番号）
 *
 * @arg showTail
 * @type boolean
 * @default true
 * @text テールを表示
 * @desc 吹き出しのテールを表示します。
 *
 * @arg position
 * @type select
 * @option 自動
 * @value 0
 * @option 上
 * @value 1
 * @option 下
 * @value 2
 * @option 画面中央
 * @value 3
 * @default 0
 * @text 表示位置
 *
 * @arg offsetX
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text Xのオフセット
 * @desc マイナスで左、プラスで右にずらします。
 *
 * @arg offsetY
 * @type number
 * @min -9999
 * @max 9999
 * @default -16
 * @text Yのオフセット
 * @desc マイナスで上（上・画面中央のとき）。下のときは自動で逆になります。
 *
 * @arg fontSize
 * @type number
 * @min -99
 * @max 99
 * @default 0
 * @text 文字サイズの増減
 * @desc データベースの文字サイズ（初期値26）に足します。例：2で28、-2で24。
 *
 * @arg fontBold
 * @type boolean
 * @default true
 * @text 太字
 * @desc 文字を太字にします。
 *
 * @arg fontItalic
 * @type boolean
 * @default false
 * @text 斜体
 * @desc 文字を斜体にします。
 *
 * @arg customW
 * @type number
 * @default 0
 * @text 幅（文字数、0=自動）
 * @desc 1で文字サイズ1つ分の幅（全角で約1文字、半角で約2文字）。0は文章に合わせます。
 *
 * @arg customH
 * @type number
 * @default 0
 * @min -1
 * @max 20
 * @text 高さ（行数、0=自動）
 * @desc -1:文章に合わせる（画面に入るまで）。0:文章に合わせる（最大4行）。入りきらない分は次のページへ送ります。
 *
 * @arg centerV
 * @type boolean
 * @default false
 * @text 縦の中央寄せ
 * @desc 文章を吹き出しの縦の真ん中に置きます。
 *
 * @arg maxChoices
 * @type number
 * @min 1
 * @max 6
 * @default 3
 * @text 選択肢の表示数
 * @desc 一度に見える選択肢の数。超えた分はスクロールします。
 *
 * @arg fitChoiceW
 * @type boolean
 * @default true
 * @text 選択肢の幅を合わせる
 * @desc 選択肢の窓を吹き出しと同じ幅にします。
 *
 * @arg focusSpeaker
 * @type boolean
 * @default false
 * @text 話し手にカメラを向ける
 * @desc 話し手が画面の中央に来るようにカメラを動かします。イベントが終わるとプレイヤーに戻ります。
 *
 * @arg se
 * @text 吹き出しSE
 * @type struct<SE>
 * @default {"name":"Cursor1","volume":"90","pitch":"100","pan":"0"}
 * @desc 1文字ごとに鳴らすSE。ファイル名を空にすると鳴りません。
 *
 * @command disableBalloon
 * @text 吹き出しモード終了
 * @desc イベントの途中で、通常のメッセージウィンドウに戻します。
 *
 * @help
 * =================================================================
 *   ご注意
 * =================================================================
 *  このプラグインは、Gemini / Claude をコーディングパートナーとして
 *  共同で開発しました。
 *  
 * =================================================================
 *   吹き出しメッセージ v1.0.0
 * =================================================================
 *  メッセージウィンドウを、キャラクターから出る吹き出しとして表示
 *  します。また、すべてのウィンドウで <B> <I> <U> のタグが使える
 *  ようになります。
 *  
 * -----------------------------------------------------------------
 *   プラグインコマンド：吹き出しモード開始（標準 / 詳細）
 * -----------------------------------------------------------------
 *  このコマンドのあとの「文章の表示」は、イベントが終わるまで
 *  吹き出しで表示されます。イベントが終わると自動で元に戻るので、
 *  最後に「終了」のコマンドを置く必要はありません。
 *  並列処理のイベントや、コモンイベントの呼び出しでは元に戻りません。
 *  
 *  「標準」で決めるのは、対象キャラクターIDとテールの表示だけです。
 *  ほかは初期値を使います。「詳細」では、下の項目をすべて決めます。
 *  
 *    対象キャラクターID   -1 = プレイヤー、0 = このイベント、
 *                         1以上 = イベントID。\V[n] で変数 n の
 *                         値をIDとして使います。
 *    テールを表示         キャラクターを指すテールを描きます。
 *    表示位置             自動 / 上 / 下 / 画面中央。
 *                         自動：キャラクターがプレイヤーより下に
 *                         いる（上から話しかけた）ときは下、それ
 *                         以外は上。画面に入らないときは反対側に
 *                         出します。
 *                         画面中央：画面の真ん中に出します。話し手
 *                         と関係のないお知らせ向けです。X / Y の
 *                         オフセットは真ん中からのずれになります
 *                         （Y はプラスで下）。
 *    X / Y のオフセット     ピクセル単位でずらします。Y は「上」の
 *                         とき上向きに測り、「下」のときは逆に
 *                         なります。
 *    文字サイズの増減     データベース > システム2 の文字サイズ
 *                         （初期値26）に足します。
 *    太字 / 斜体          吹き出しの文字の初期の書式です。
 *    幅（文字数）         幅を固定します。1 で文字サイズ1つ分（全角
 *                         で約1文字、半角で約2文字）。0 は文章に
 *                         合わせます。
 *                         吹き出しは画面より広くなりません。入り
 *                         きらない行は自動で次の行へ折り返します。
 *    高さ（行数）         高さを行数で固定します（1〜20）。
 *                         0 = 文章に合わせる（最大4行）。
 *                         -1 = 文章に合わせる（画面に入るまで）。
 *                         どの場合も画面に入る高さまでで、入り
 *                         きらない分は次のページへ送ります。
 *                         「標準」では 0 です。
 *    縦の中央寄せ         文章を吹き出しの縦の真ん中に置きます。
 *    選択肢の表示数       一度に見える選択肢の数（1〜6）。超えた分
 *                         はスクロールします。「標準」では 3 です。
 *    選択肢の幅を合わせる 選択肢の窓を吹き出しと同じ幅にします。
 *                         「標準」では true です。
 *    話し手にカメラを向ける
 *                         先に話し手が画面の中央に来るように
 *                         カメラを動かします。イベントが終わると
 *                         カメラはプレイヤーに戻り、戻りきるまで
 *                         プレイヤーは動けません。
 *                         「標準」では false です。
 *    吹き出しSE           1文字ごとに鳴らす音です。ファイル名を
 *                         空にすると鳴りません。
 *  
 *  プラグインコマンド：吹き出しモード終了
 *    イベントの途中で、通常のメッセージウィンドウに戻します。
 *    もう一度「開始」を使うと、吹き出しに戻ります。
 *  
 * -----------------------------------------------------------------
 *   続けて置いた「文章の表示」
 * -----------------------------------------------------------------
 *  「吹き出しモード開始（詳細）」で高さ（行数）を -1 または
 *  5 以上に設定しているとき、続けて置いた「文章の表示」を
 *  1つの吹き出しにまとめて表示します。顔グラフィック・名前・
 *  背景・位置は、1つ目のものを使います。吹き出しを分けたいときは、
 *  「文章の表示」の最後の行を空行にしてください。その空行は
 *  表示されません。
 *  「吹き出しモード開始（標準）」のときや、高さ（行数）が
 *  0〜4 のときは、文章は結合されません。
 *  
 * -----------------------------------------------------------------
 *   選択肢
 * -----------------------------------------------------------------
 *  「文章の表示」のすぐ後の「選択肢の表示」は、吹き出しと同時に
 *  開き、文章の下にくっついて表示されます。あいだにラベル・注釈・
 *  ラベルジャンプがあってもかまいません。ほかのコマンドがあると、
 *  選択肢は単独で表示されます。
 *  選択肢の窓は吹き出しより広くならず、長い選択肢は切れます。
 *  吹き出しより狭いときは、「選択肢の表示」の位置（左 / 中 / 右）
 *  で吹き出しに合わせて寄せます。
 *  選択肢は、文章を表示し終えてから選べます。
 *  
 *  すぐ前に「文章の表示」がない「選択肢の表示」は、対象
 *  キャラクターの近くに出します：
 *    自動      キャラクターが画面の上半分にいれば下、下半分に
 *              いれば上
 *    上        キャラクターの頭の上
 *    下        キャラクターの足もと
 *    画面中央  画面の真ん中
 *  横の位置は「選択肢の表示」の位置（左 / 中 / 右）に従います
 *  （画面中央のときは真ん中）。一度に見える数は「選択肢の表示数」
 *  で決まり、超えた分はスクロールします。
 *  
 * -----------------------------------------------------------------
 *   文字のタグ（すべてのウィンドウ）
 * -----------------------------------------------------------------
 *  吹き出しに限らず、ウィンドウに書く文字すべてで使えます：
 *  
 *    <B>太字</B>        <I>斜体</I>        <U>下線</U>
 *  
 *  「文章の表示」では、次のタグでその行を寄せられます：
 *  
 *    <ct>中央寄せ</ct>  <rt>右寄せ</rt>
 *  
 *  </B> や </I> で閉じると、吹き出しの表示中は吹き出しの太字 /
 *  斜体の設定に、それ以外は通常の文字に戻ります。
 *  < > をそのまま表示したいときは、<<このように>> 2つ重ねると
 *  <このように> と表示されます。
 *  
 *  吹き出し・テール・選択肢の窓の色は、このファイルのコードの
 *  先頭で変えられます。
 * 
 * =================================================================
 *   ライセンス
 * =================================================================
 *  Copyright (c) 2026 Kopi Luwak
 *
 *  MIT License
 *
 *  このプラグインは MIT ライセンスで公開されています。
 *  ライセンス全文は GitHub リポジトリを参照してください：
 *  https://github.com/KopiLuwak668/KP_BalloonMsgMZ
 *
 *  再配布する場合は、著作権表示とライセンス全文を保持してください。
 *  
 */
/*~struct~SE:ja
 * @param name
 * @text ファイル名
 * @type file
 * @dir audio/se
 * @default 
 *
 * @param volume
 * @text 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text ピッチ
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param pan
 * @text 位相
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */
(() => {
    'use strict';

    const pluginName = "KP_BalloonMsgMZ";
    // 文字の下の座布団と、テールの色（テールはウィンドウスキンの枠と中の色に合わせる）
    const CFG_B = {
        textBack: 'rgba(0, 0, 0, 0.4)',       // 文字と名前の下の座布団
        tailFill: 'rgba(255, 255, 255, 0.9)', // テールの中
        tailEdge: 'rgba(124, 183, 255, 0.9)', // テールの縁
    };
    // 選択肢の行の色（選んでいる行と、ほかの行。上から下へのグラデーション）
    const CHOICE_STYLE = {
        gradSel1: 'rgba(0, 100, 255, 0.6)',
        gradSel2: 'rgba(0, 50, 200, 0.6)',
        gradNor1: 'rgba(0, 0, 0, 0.5)',
        gradNor2: 'rgba(0, 0, 0, 0.3)',
    };

    // 画面上の見た目の高さ（画像のないイベントは、主人公と同じ高さとして扱う）
    function _balloonSpriteHeight(sprite) {
        if (sprite.bitmap && !sprite.isEmptyCharacter()) {
            return (sprite.patternHeight() || 48) * Math.abs(sprite.worldTransform.d || 1);
        }
        const playerSprite = SceneManager._scene._spriteset._characterSprites.find(s => s._character === $gamePlayer);
        return playerSprite.patternHeight() * Math.abs(playerSprite.worldTransform.d || 1);
    }

    // 吹き出しの座標を、ほかの窓の座標に直すときのずれ（2つの窓の親の位置の差）
    function _balloonParentGap(mw, other) {
        const a = mw.parent ? mw.parent.worldTransform : null;
        const b = other.parent ? other.parent.worldTransform : null;
        return { x: (a ? a.tx : 0) - (b ? b.tx : 0), y: (a ? a.ty : 0) - (b ? b.ty : 0) };
    }

    // -------------------------------------------------------------------------
    // Game_Systemの拡張
    // -------------------------------------------------------------------------
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._balloonMode = false;      
        this._balloonTargetId = 0;      
        this._balloonPos = 0;           
        this._balloonOffsetX = 0;       
        this._balloonOffsetY = 0;       
        this._balloonShowTail = true;
        this._balloonfontSize = 0;
        this._balloonFontBold = false;
        this._balloonFontItalic = false;
        this._balloonW = 0;             
        this._balloonH = 0;
        this._balloonMaxChoices = 3;
        this._balloonCenterV = false;
        this._balloonFitChoiceW = true;
        this._balloonFocus = false;
        this._balloonSE = null;
    };
    PluginManager.registerCommand(pluginName, "enableBalloonDefault", function(args) {
        let rawId = String(args.characterId || "0").trim();
        rawId = rawId.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
        if (rawId.match(/^\\V\[(\d+)\]$/i)) rawId = $gameVariables.value(parseInt(RegExp.$1, 10));
        
        let charId = parseInt(rawId, 10);
        if (isNaN(charId)) charId = 0;

        $gameSystem._balloonMode = true;
        $gameSystem._balloonTargetId = (charId === 0) ? this.eventId() : charId;
        
        $gameSystem._balloonPos = 0;
        $gameSystem._balloonOffsetX = 0;
        $gameSystem._balloonOffsetY = -16;
        $gameSystem._balloonShowTail = args.showTail !== 'false';
        $gameSystem._balloonfontSize = 0; 
        $gameSystem._balloonFontBold = true;
        $gameSystem._balloonFontItalic = false;
        $gameSystem._balloonW = 0;
        $gameSystem._balloonH = 0;
        $gameSystem._balloonMaxChoices = 3;
        $gameSystem._balloonCenterV = false;
        $gameSystem._balloonFitChoiceW = true;
        $gameSystem._balloonFocus = false;
        $gameSystem._balloonSE = {
            name: "Cursor1", volume: 90, pitch: 100, pan: 0
        };
    });
    PluginManager.registerCommand(pluginName, "enableBalloon", function(args) {
        let rawId = String(args.characterId || "0").trim();
        rawId = rawId.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
        if (rawId.match(/^\\V\[(\d+)\]$/i)) rawId = $gameVariables.value(parseInt(RegExp.$1, 10));
        
        let charId = parseInt(rawId, 10);
        if (isNaN(charId)) charId = 0;

        $gameSystem._balloonMode = true;
        $gameSystem._balloonTargetId = (charId === 0) ? this.eventId() : charId;
        $gameSystem._balloonPos = args.position !== undefined ? Number(args.position) : 0;
        $gameSystem._balloonOffsetX = Number(args.offsetX || 0);
        $gameSystem._balloonOffsetY = Number(args.offsetY || 0);
        $gameSystem._balloonShowTail = args.showTail !== 'false';
        $gameSystem._balloonfontSize = Number(args.fontSize || 0); 
        $gameSystem._balloonFontBold = args.fontBold === "true";
        $gameSystem._balloonFontItalic = args.fontItalic === "true";
        $gameSystem._balloonW = Number(args.customW || 0);
        $gameSystem._balloonH = Number(args.customH || 0);
        $gameSystem._balloonMaxChoices = Number(args.maxChoices || 3);
        $gameSystem._balloonCenterV = args.centerV === 'true';
        $gameSystem._balloonFitChoiceW = args.fitChoiceW === 'true';
        $gameSystem._balloonFocus = args.focusSpeaker === 'true';
        // 話し手を画面の中央へ（速さ4）
        if ($gameSystem._balloonFocus) {
            const id = $gameSystem._balloonTargetId;
            const ch = id === -1 ? $gamePlayer : $gameMap.event(id);
            if (ch) {
                $gameMap._kpBalloonCamTargX = ch.x - $gamePlayer.x;
                $gameMap._kpBalloonCamTargY = $gamePlayer.y - ch.y;
                $gameMap._kpBalloonCamSpd = Math.pow(2, 4) / 256;
                if (!$gameMap._kpBalloonCamOffX) $gameMap._kpBalloonCamOffX = 0;
                if (!$gameMap._kpBalloonCamOffY) $gameMap._kpBalloonCamOffY = 0;
                this.setWaitMode('kpBalloonCamera');
            }
        }
        try {
            const _se = args.se ? JSON.parse(args.se) : null;
            $gameSystem._balloonSE = (_se && _se.name) ? {
                name: _se.name, volume: Number(_se.volume ?? 90),
                pitch: Number(_se.pitch ?? 100), pan: Number(_se.pan ?? 0)
            } : null;
        } catch(e) { $gameSystem._balloonSE = null; }
    });

    PluginManager.registerCommand(pluginName, "disableBalloon", function(args) {
        $gameSystem._balloonMode = false;
    });

    const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
    Game_Interpreter.prototype.terminate = function() {
        _Game_Interpreter_terminate.call(this);
        if ($gameMap && this === $gameMap._interpreter) {
            $gameSystem._balloonMode = false;
            // 話し手に合わせたカメラを主人公へ戻す
            if ($gameSystem._balloonFocus) {
                $gameSystem._balloonFocus = false;
                $gameMap._kpBalloonCamTargX = 0;
                $gameMap._kpBalloonCamTargY = 0;
                $gameTemp._rlsBalloonCamReturn = true;
            }
        }
    };

    // 話し手から主人公へカメラが戻り終わるまで、キーとマウスの入力を受け付けない
    const _SceneManager_updateInputData = SceneManager.updateInputData;
    SceneManager.updateInputData = function() {
        _SceneManager_updateInputData.call(this);
        if ($gameTemp && $gameTemp._rlsBalloonCamReturn) {
            // 戻り終わったら、さらに少し待ってから入力を受け付ける（8フレーム）
            if (Math.abs($gameMap._kpBalloonCamOffX || 0) < 0.01 && Math.abs($gameMap._kpBalloonCamOffY || 0) < 0.01) {
                if ($gameTemp._rlsBalloonCamWait === undefined) $gameTemp._rlsBalloonCamWait = 8;
                if (--$gameTemp._rlsBalloonCamWait <= 0) {
                    $gameTemp._rlsBalloonCamReturn = false;
                    $gameTemp._rlsBalloonCamWait = undefined;
                }
            }
            Input.clear();
            TouchInput.clear();
        }
    };

    // -------------------------------------------------------------------------
    // 話し手へのカメラ（Focus on Speaker）
    //   主人公からのずれ（マス）を少しずつ目標へ近づけ、ずれがある間は画面をそこへ合わせる
    // -------------------------------------------------------------------------
    const _Game_Map_setup_Cam = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup_Cam.call(this, mapId);
        this._kpBalloonCamOffX  = 0;
        this._kpBalloonCamOffY  = 0;
        this._kpBalloonCamTargX = 0;
        this._kpBalloonCamTargY = 0;
        this._kpBalloonCamSpd   = 0;
    };

    const _Game_Map_update_Cam = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update_Cam.call(this, sceneActive);
        const spd = this._kpBalloonCamSpd || 0;
        if (spd <= 0) return;
        if (!this._kpBalloonCamOffX) this._kpBalloonCamOffX = 0;
        if (!this._kpBalloonCamOffY) this._kpBalloonCamOffY = 0;
        const tx = this._kpBalloonCamTargX || 0;
        const ty = this._kpBalloonCamTargY || 0;
        const dx = tx - this._kpBalloonCamOffX;
        const dy = ty - this._kpBalloonCamOffY;
        this._kpBalloonCamOffX = Math.abs(dx) <= spd ? tx : this._kpBalloonCamOffX + Math.sign(dx) * spd;
        this._kpBalloonCamOffY = Math.abs(dy) <= spd ? ty : this._kpBalloonCamOffY + Math.sign(dy) * spd;
    };

    const _Game_Screen_update_Cam = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        _Game_Screen_update_Cam.call(this);
        if (!$gameMap || !$gamePlayer) return;
        const offX = $gameMap._kpBalloonCamOffX || 0;
        const offY = $gameMap._kpBalloonCamOffY || 0;
        if (offX === 0 && offY === 0) return;
        const cx = (Graphics.width  / 2 - $gameMap.tileWidth()  / 2) / $gameMap.tileWidth();
        const cy = (Graphics.height / 2 - $gameMap.tileHeight() / 2) / $gameMap.tileHeight();
        // Y は「上が正」
        $gameMap.setDisplayPos($gamePlayer.x + offX - cx, $gamePlayer.y - offY - cy);
    };

    // カメラが話し手に着くまで、イベントを待たせる
    const _Game_Interpreter_updateWaitMode_Cam = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'kpBalloonCamera') {
            const ox = $gameMap._kpBalloonCamOffX || 0;
            const oy = $gameMap._kpBalloonCamOffY || 0;
            if (Math.abs(ox - ($gameMap._kpBalloonCamTargX || 0)) < 0.01 &&
                Math.abs(oy - ($gameMap._kpBalloonCamTargY || 0)) < 0.01) {
                this._waitMode = '';
                return false;
            }
            return true;
        }
        return _Game_Interpreter_updateWaitMode_Cam.call(this);
    };

    // 吹き出しモードでは、文章の後ろのラベル・注釈・ラベルジャンプを先読みし、その先が選択肢なら文章と1組にする
    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        const result = _Game_Interpreter_command101.call(this, params);
        if (result && $gameSystem._balloonMode && !$gameMessage.isChoice() &&
            !$gameMessage.isNumberInput() && !$gameMessage.isItemChoice()) {
            this.rlsMergeFollowingText();
            this.rlsLinkChoicesAfterText();
        }
        return result;
    };

    // 吹き出しモードでは、続けて置いた文章を1つの吹き出しにまとめる（最後の行が空行なら、そこで区切る。空行は表示しない）
    Game_Interpreter.prototype.rlsMergeFollowingText = function() {
        const h = $gameSystem ? ($gameSystem._balloonH || 0) : 0;
        if (h !== -1 && h < 5) return;
        for (;;) {
            const texts = $gameMessage._texts;
            if (texts.length > 0 && texts[texts.length - 1] === "") {
                texts.pop();
                return;
            }
            if (this.nextEventCode() !== 101) return;
            this._index++;
            while (this.nextEventCode() === 401) {
                this._index++;
                $gameMessage.add(this.currentCommand().parameters[0]);
            }
        }
    };

    Game_Interpreter.prototype.rlsLinkChoicesAfterText = function() {
        let i = this._index + 1;
        for (let step = 0; step < 100 && i < this._list.length; step++) {
            const cmd = this._list[i];
            if (cmd.code === 118 || cmd.code === 108 || cmd.code === 408) {
                i++;
            } else if (cmd.code === 119) {
                const name = cmd.parameters[0];
                const to = this._list.findIndex(c => c.code === 118 && c.parameters[0] === name);
                if (to < 0) return;
                i = to;
            } else if (cmd.code === 102) {
                this.jumpTo(i);
                this._indent = cmd.indent;
                this.setupChoices(cmd.parameters);
                return;
            } else {
                return;
            }
        }
    };

    Window_Message.prototype._refreshContentsBack = function() {
        if ($gameSystem._balloonMode) {
            if (this._contentsBackSprite) {
                const w = this.innerWidth;
                const h = this.innerHeight;
                if (w > 0 && h > 0) {
                    this._contentsBackSprite.bitmap = new Bitmap(w, h);
                    this._contentsBackSprite.bitmap.fillAll(CFG_B.textBack);
                }
                this._contentsBackSprite.visible = true;
            }
        } else {
            Window.prototype._refreshContentsBack.call(this);
        }
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.call(this);
        if ($gameSystem._balloonMode && this._contentsBackSprite &&
            this._contentsBackSprite.bitmap && this.isOpen()) {
            this._contentsBackSprite.visible = true;
        }
    };

    const _updateMessage = Window_Message.prototype.updateMessage;
    Window_Message.prototype.updateMessage = function() {
        const prevIndex = this._textState ? this._textState.index : -1;
        const result = _updateMessage.call(this);
        if ($gameSystem._balloonMode && $gameSystem._balloonSE &&
            this._textState && this._textState.index > prevIndex &&
            this._textState.text[prevIndex] >= " ") {
            AudioManager.playSe($gameSystem._balloonSE);
        }
        return result;
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if ($gameSystem._balloonMode && this._messageWindow && this._messageWindow.openness > 0) {
            this._messageWindow.updateBalloonPosition();
        }
    };

    // -------------------------------------------------------------------------
    // Window_Message の拡張
    // -------------------------------------------------------------------------
    
    const _Window_Message_resetFontSettings = Window_Message.prototype.resetFontSettings;
    Window_Message.prototype.resetFontSettings = function() {
        _Window_Message_resetFontSettings.call(this);
        if ($gameSystem._balloonMode) {
            const baseSize = $gameSystem.mainFontSize ? $gameSystem.mainFontSize() : 26;
            this.contents.fontSize = baseSize + $gameSystem._balloonfontSize;
            this.contents.fontBold = $gameSystem._balloonFontBold;
            this.contents.fontItalic = $gameSystem._balloonFontItalic;
        }
    };

    const _Window_Message_lineHeight = Window_Message.prototype.lineHeight;
    Window_Message.prototype.lineHeight = function() {
        if ($gameSystem._balloonMode) {
            const baseSize = $gameSystem.mainFontSize ? $gameSystem.mainFontSize() : 26;
            const currentSize = baseSize + $gameSystem._balloonfontSize;
            return Math.max(36, currentSize + 10); 
        }
        return _Window_Message_lineHeight.call(this);
    };

    const _Window_Message_needsNewPage = Window_Message.prototype.needsNewPage;
    Window_Message.prototype.needsNewPage = function(textState) {
        if ($gameSystem._balloonMode && !textState.drawing) {
            return false;
        }
        return _Window_Message_needsNewPage.call(this, textState);
    };
    
    // 吹き出しの幅に入りきらない文字を、次の行へ折り返す（英語は単語ごと、日本語は1文字ごと）
    const _Window_Message_processCharacter_Wrap = Window_Message.prototype.processCharacter;
    Window_Message.prototype.processCharacter = function(textState) {
        if (this.rlsWrapIfNeeded(textState)) return;
        _Window_Message_processCharacter_Wrap.call(this, textState);
    };

    // 折り返したうえでページ送りの待ちに入ったときは true（その文字は次のページの頭で書く）
    Window_Message.prototype.rlsWrapIfNeeded = function(textState) {
        if (!$gameSystem._balloonMode || !(this._rlsWrapW > 0)) return false;
        const text = textState.text;
        const c = text[textState.index];
        if (!c || c <= " ") return false;
        const isWordChar = ch => ch > " " && ch <= "~";
        let word = c;
        if (isWordChar(c)) {
            if (textState.index > 0 && isWordChar(text[textState.index - 1])) return false;
            let i = textState.index + 1;
            while (i < text.length && isWordChar(text[i])) i++;
            word = text.slice(textState.index, i);
        }
        if (textState.x === textState.startX && textState.buffer === "") return false;
        if (textState.x + this.textWidth(textState.buffer + word) <= this._rlsWrapW) return false;
        this.flushTextState(textState);
        this.processNewLine(textState);
        return this.pause;
    };

    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.call(this);
        if ($gameSystem._balloonMode) {
            this.setupBalloonSettings();
        } else {
            this.restoreDefaultPlacement();
        }
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        _Window_Message_terminateMessage.call(this);
        this._balloonTarget = null;
        if (this._balloonTailSprite) this._balloonTailSprite.visible = false; 
    };

    Window_Message.prototype.restoreDefaultPlacement = function() {
        this.padding = $gameSystem.windowPadding ? $gameSystem.windowPadding() : 12;
        this.width = Graphics.boxWidth;
        this.height = this.fittingHeight(4);
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
        
        if (this.contents.width !== this.innerWidth || this.contents.height !== this.innerHeight) {
            this.createContents();
        }
        this._balloonTarget = null;
        if (this._balloonTailSprite) this._balloonTailSprite.visible = false;
    };

    Window_Message.prototype.getBalloonTargetSpriteHeight = function() {
        let spriteHeight = 48; 
        if (SceneManager._scene instanceof Scene_Map && this._balloonTarget) {
            const sprites = SceneManager._scene._spriteset._characterSprites;
            if (sprites) {
                const targetSprite = sprites.find(s => s._character === this._balloonTarget);
                if (targetSprite && targetSprite.bitmap) {
                    spriteHeight = targetSprite.patternHeight() || 48;
                }
            }
        }
        return spriteHeight;
    };

    // 選択肢を吹き出しに食い込ませる量（枠線同士をぴったり重ねる）
    const BALLOON_CHOICE_OVERLAP = 4;

    // 文章のすぐ後に選択肢があるときの、吹き出しの下に増える高さ（無ければ0）
    Window_Message.prototype.rlsChoiceBlockHeight = function() {
        if (!$gameSystem._balloonMode || !$gameMessage.isChoice() || !this._choiceListWindow) return 0;
        return this._choiceListWindow.windowHeight() - BALLOON_CHOICE_OVERLAP;
    };

    Window_Message.prototype.createBalloonTail = function() {
        if (!this._balloonTailSprite) {
            this._balloonTailSprite = new Sprite(new Bitmap(32, 320));
            this.addChildAt(this._balloonTailSprite, 1);
        }
        this._balloonTailSprite.visible = true;
    };

    Window_Message.prototype.updateBalloonTail = function(targetAbsX, targetAbsY) {
        if (!this._balloonTailSprite) return;
        const side = this._rlsTailSide || this._currentBalloonPosType;

        const bmp = this._balloonTailSprite.bitmap;
        bmp.clear();
        const ctx = bmp.context;
        
        ctx.fillStyle = CFG_B.tailFill;
        ctx.strokeStyle = CFG_B.tailEdge;
        ctx.lineWidth = 4;
        const frameOverlap = 2; 
        const bmpH = 320;

        let tailRelativeX = targetAbsX - this.x - 16; 
        const minTailX = 16;
        const maxTailX = this.width - 48;
        this._balloonTailSprite.x = Math.max(minTailX, Math.min(tailRelativeX, maxTailX));

        let tipX = targetAbsX - (this.x + this._balloonTailSprite.x);
        tipX = Math.max(0, Math.min(tipX, 32));

        // 吹き出しが上で選択肢があるとき：選択肢が開いたら尻尾は選択肢の下から、開くまでは選択肢の場所を通してキャラまで伸ばす
        const choiceH = side === 1 ? this.rlsChoiceBlockHeight() : 0;
        const choiceOpen = choiceH > 0;
        const startY = this.height + (choiceOpen ? choiceH : 0);
        let stretchY = 24; 
        if (targetAbsY !== undefined) {
            if (side === 1) {
                stretchY = targetAbsY - (this.y + startY);
            } else {
                stretchY = this.y - targetAbsY;
            }
        }
        stretchY = Math.max(16, Math.min(stretchY, 56 + (choiceOpen ? 0 : choiceH)));

        ctx.beginPath();
        if (side === 1) { 
            ctx.moveTo(8, 0);
            ctx.lineTo(24, 0);  
            ctx.lineTo(tipX, stretchY); 
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.strokeStyle = ctx.fillStyle; 
            ctx.moveTo(7, 0);
            ctx.lineTo(25, 0);
            ctx.stroke();

            this._balloonTailSprite.y = startY - frameOverlap;
        } else { 
            ctx.moveTo(8, bmpH);   
            ctx.lineTo(24, bmpH);  
            ctx.lineTo(tipX, bmpH - stretchY); 
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.moveTo(7, bmpH);
            ctx.lineTo(25, bmpH);
            ctx.stroke();

            this._balloonTailSprite.y = -(bmpH - frameOverlap);
        }
    };

    Window_Message.prototype.updateBalloonPosition = function() {
        if (!this._balloonTarget) return;

        const spriteset = SceneManager._scene._spriteset;
        if (!spriteset) return;
        const sprite = spriteset._characterSprites.find(s => s._character === this._balloonTarget);
        
        let charX = this._balloonTarget.screenX();
        let charY = this._balloonTarget.screenY();
        let spriteHeight = this.getBalloonTargetSpriteHeight();

        if (sprite) {
            const pos = sprite.getGlobalPosition();
            charX = pos.x;
            charY = pos.y;
            spriteHeight = _balloonSpriteHeight(sprite);
        }

        let targetX = charX - (this.width / 2) + $gameSystem._balloonOffsetX;
        let targetY = 0;
        const choiceH = this.rlsChoiceBlockHeight();

        if (this._currentBalloonPosType === 3) {
            targetX = (Graphics.boxWidth - this.width) / 2 + $gameSystem._balloonOffsetX;
            targetY = (Graphics.boxHeight - this.height - choiceH) / 2 + $gameSystem._balloonOffsetY;
        } else if (this._currentBalloonPosType === 1) { 
            targetY = charY - this.height - choiceH - spriteHeight + $gameSystem._balloonOffsetY;
        } else { 
            targetY = charY - $gameSystem._balloonOffsetY; 
        }

        const minX = 24;
        const maxX = Graphics.boxWidth - this.width - 24;
        const minY = 24;
        const maxY = Graphics.boxHeight - this.height - choiceH - 24;

        this.x = Math.max(minX, Math.min(targetX, maxX));
        this.y = Math.max(minY, Math.min(targetY, maxY));

        // テールの向き（Center のときは、話し手が吹き出しの真ん中より下なら下向き、上なら上向き）
        const side = this._currentBalloonPosType === 3 ? (charY - spriteHeight > this.y + this.height / 2 ? 1 : 2) : this._currentBalloonPosType;
        this._rlsTailSide = side;
        let tipAbsY = (side === 1) ? charY - spriteHeight : charY;
        this.updateBalloonTail(charX + (this._currentBalloonPosType === 3 ? 0 : $gameSystem._balloonOffsetX), tipAbsY);

        if (this._nameBoxWindow && this._nameBoxWindow.visible) {
            const nGap = _balloonParentGap(this, this._nameBoxWindow);
            this._nameBoxWindow.x = this.x + nGap.x;
            this._nameBoxWindow.y = this.y + nGap.y - this._nameBoxWindow.height + BALLOON_CHOICE_OVERLAP;
        }

        // 文章と1組の選択肢は、名前ウィンドウと同じく毎フレーム吹き出しに付いて動かす
        const cw = this._choiceListWindow;
        if (cw && $gameMessage.isChoice() && cw.openness > 0) {
            cw.x = cw.windowX();
            cw.y = cw.windowY();
        }
    };

    Window_Message.prototype.setupBalloonSettings = function() {
        const padding = 12; 
        this.padding = padding;
        this._rlsWrapW = 0;

        const allText = $gameMessage.allText();
        const textSize = this.textSizeEx(allText); 
        const texts = allText.split('\n');

        const hasFace = $gameMessage.faceName() !== '';
        const leftMargin = hasFace ? ImageManager.faceWidth + 20 : 4;
        const rightMargin = 8; 
        const baseSize = $gameSystem.mainFontSize ? $gameSystem.mainFontSize() : 26;
        const currentFontSize = baseSize + $gameSystem._balloonfontSize;
        const lineHeight = this.lineHeight(); 

        let autoW = textSize.width + leftMargin + rightMargin + (padding * 2) + 16; 
        let calculatedH = Math.max(textSize.height, texts.length * lineHeight);
        let autoH = calculatedH + (padding * 2);

        if (hasFace && autoH < ImageManager.faceHeight + (padding * 2)) {
            autoH = ImageManager.faceHeight + (padding * 2);
        }

        this.width = Math.min(Graphics.boxWidth - 48, $gameSystem._balloonW > 0 ? ($gameSystem._balloonW * currentFontSize) + leftMargin + rightMargin + (padding * 2) : autoW);
        this._rlsWrapW = this.innerWidth - rightMargin;
        autoH = Math.max(autoH, this.textSizeEx(allText).height + (padding * 2));
        const screenLines = Math.floor((Graphics.boxHeight - 72 - padding * 2) / lineHeight);
        const maxLines = $gameSystem._balloonH === 0 ? Math.min(4, screenLines) : screenLines;
        this.height = $gameSystem._balloonH > 0 ? (Math.min($gameSystem._balloonH, screenLines) * lineHeight) + (padding * 2) : Math.min(autoH, maxLines * lineHeight + padding * 2);
        
        this.createContents();
        this._refreshContentsBack();

        let target = null;
        if ($gameSystem._balloonTargetId === -1) {
            target = $gamePlayer;
        } else if ($gameSystem._balloonTargetId > 0) {
            target = $gameMap.event($gameSystem._balloonTargetId);
        }

        if (!target) target = $gamePlayer;
        this._balloonTarget = target;

        this._currentBalloonPosType = $gameSystem._balloonPos;
        if (this._currentBalloonPosType === 0) { 
            
            const centerChar = $gamePlayer;

            const distY = this._balloonTarget.y - centerChar.y;
            
            // 相手が主人公より下にいれば（上から話しかけたら）下、それ以外は上
            if (this._balloonTarget !== centerChar && distY > 0) {
                this._currentBalloonPosType = 2;
            } else {
                this._currentBalloonPosType = 1;
            }

            let checkY = this._balloonTarget.screenY();
            let checkH = this.getBalloonTargetSpriteHeight();
            const spriteset = SceneManager._scene._spriteset;
            if (spriteset) {
                const sprite = spriteset._characterSprites.find(s => s._character === this._balloonTarget);
                if (sprite) {
                    checkY = sprite.getGlobalPosition().y;
                    checkH = _balloonSpriteHeight(sprite);
                }
            }
            
            const choiceH = this.rlsChoiceBlockHeight();
            const topEdgeY = checkY - checkH - this.height - choiceH + $gameSystem._balloonOffsetY;
            if (this._currentBalloonPosType === 1 && topEdgeY < 8) {
                this._currentBalloonPosType = 2; 
            }

            const bottomEdgeY = checkY - $gameSystem._balloonOffsetY + this.height + choiceH;
            if (this._currentBalloonPosType === 2 && bottomEdgeY > Graphics.height - 16) {
                this._currentBalloonPosType = 1;
            }
        }

        if ($gameSystem._balloonShowTail !== false) this.createBalloonTail();
        else if (this._balloonTailSprite) this._balloonTailSprite.visible = false;
        this.updateBalloonPosition();
    };

    // =========================================================================
    // HTML風テキストタグの拡張機能 (<B>, <I>, <U>) - 安全処理版
    // =========================================================================
    
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = text.replace(/<<([^>]+)>>/g, '\x1F$1\x1E');
        let newText = _Window_Base_convertEscapeCharacters.call(this, text);
        // MZ標準の\x1bを利用すると後続の英字を飲み込むため、未使用の制御文字(0x02~0x07)に直接置換します
        newText = newText.replace(/<B>/gi, '\x02');
        newText = newText.replace(/<\/B>/gi, '\x03');
        newText = newText.replace(/<I>/gi, '\x04');
        newText = newText.replace(/<\/I>/gi, '\x05');
        newText = newText.replace(/<U>/gi, '\x06');
        newText = newText.replace(/<\/U>/gi, '\x07');
        newText = newText.replace(/<ct>/gi, '\x10');
        newText = newText.replace(/<\/ct>/gi, '\x11');
        newText = newText.replace(/<rt>/gi, '\x12');
        newText = newText.replace(/<\/rt>/gi, '\x13');
        newText = newText.replace(/\x1F([^\x1E]*)\x1E/g, '<$1>');
        return newText;
    };

    const _Window_Base_processControlCharacter = Window_Base.prototype.processControlCharacter;
    Window_Base.prototype.processControlCharacter = function(textState, c) {
        if (c === '\x02') {
            this.contents.fontBold = true;
        } else if (c === '\x03') {
            let defBold = false;
            if ($gameSystem && $gameSystem._balloonMode && this instanceof Window_Message) {
                defBold = $gameSystem._balloonFontBold;
            }
            this.contents.fontBold = defBold;
        } else if (c === '\x04') {
            this.contents.fontItalic = true;
        } else if (c === '\x05') {
            let defItalic = false;
            if ($gameSystem && $gameSystem._balloonMode && this instanceof Window_Message) {
                defItalic = $gameSystem._balloonFontItalic;
            }
            this.contents.fontItalic = defItalic;
        } else if (c === '\x06') {
            this._textUnderline = true;
        } else if (c === '\x07') {
            this._textUnderline = false;
        } else if (c === '\x10' || c === '\x11' || c === '\x12' || c === '\x13') {
            if (this instanceof Window_Message && textState.drawing) {
                this._rlsAlign = c === '\x10' ? 1 : c === '\x12' ? 2 : 0;
            }
        } else {
            _Window_Base_processControlCharacter.call(this, textState, c);
        }
    };

    const _Window_Base_resetFontSettings_HTML = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
        _Window_Base_resetFontSettings_HTML.call(this);
        this._textUnderline = false; 
    };

    // ★ ここがMZの「バッファ描画」に合わせた正しいアンダーライン処理
    const _Window_Base_flushTextState = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function(textState) {
        // 描画される前の文字幅と座標を保存しておく
        const text = textState.buffer;
        const width = this.textWidth(text);
        const rtl = textState.rtl;
        const x = rtl ? textState.x - width : textState.x;
        const y = textState.y;
        const height = textState.height;
        const isUnderline = this._textUnderline;

        // ツクール標準の文字描画を実行（ここでバッファが空になる）
        _Window_Base_flushTextState.call(this, textState);

        // 文字が描画された直後に、その幅と座標に合わせて下線を引く
        if (isUnderline && text !== "") {
            const py = y + height - 4; // 文字の少し下
            const color = this.contents.textColor;
            this.contents.fillRect(x, py, width, 2, color);
        }
    };

    // =========================================================================
    // 横寄せタグ（<ct>～</ct> 中央、<rt>～</rt> 右）と縦の中央寄せ（Center Vertically）
    // =========================================================================
    // 文字の大きさを測る（測ったあと、描きかけの文字の設定を元に戻す）
    Window_Message.prototype.rlsMeasureText = function(text) {
        const c = this.contents;
        const saved = [c.fontFace, c.fontSize, c.fontBold, c.fontItalic, c.textColor, c.outlineColor, c.outlineWidth, this._textUnderline];
        const size = this.textSizeEx(text);
        [c.fontFace, c.fontSize, c.fontBold, c.fontItalic, c.textColor, c.outlineColor, c.outlineWidth, this._textUnderline] = saved;
        return size;
    };

    // 行の書き始めの位置を、その行の寄せ方に合わせてずらす
    Window_Message.prototype.rlsAlignLine = function(textState) {
        if (!textState.drawing) return;
        const line = textState.text.slice(textState.index).split('\n')[0];
        let align = this._rlsAlign || 0;
        const m = line.match(/[\x10\x12]/);
        if (m) align = m[0] === '\x10' ? 1 : 2;
        if (align === 0) return;
        const right = this._rlsWrapW > 0 ? this._rlsWrapW : this.innerWidth;
        const space = Math.max(0, right - textState.startX - this.rlsMeasureText(line).width);
        textState.x = textState.startX + Math.floor(align === 1 ? space / 2 : space);
    };

    const _Window_Message_newPage_Align = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        this._rlsAlign = 0;
        _Window_Message_newPage_Align.call(this, textState);
        this.rlsAlignLine(textState);
    };

    const _Window_Message_processNewLine_Align = Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function(textState) {
        _Window_Message_processNewLine_Align.call(this, textState);
        this.rlsAlignLine(textState);
    };

    // 窓の大きさが決まってから、縦の中央寄せと1行目の横寄せを計算し直す
    const _Window_Message_startMessage_Align = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage_Align.call(this);
        const ts = this._textState;
        if (!ts) return;
        if ($gameSystem._balloonMode && $gameSystem._balloonCenterV) {
            ts.y = Math.max(0, Math.floor((this.innerHeight - this.rlsMeasureText(ts.text).height) / 2));
        }
        this.rlsAlignLine(ts);
    };

    // 文章と選択肢が1組のときは、吹き出しと同時に選択肢も開いておく（選べるのは文章を表示し終えてから）
    const _Window_Message_startMessage_Choice = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        _Window_Message_startMessage_Choice.call(this);
        if ($gameSystem._balloonMode && $gameMessage.isChoice() && this._choiceListWindow) {
            this._choiceListWindow.start();
            this._choiceListWindow.deactivate();
        }
    };

    const _Window_ChoiceList_start = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function() {
        if ($gameSystem._balloonMode && !$gameMessage.hasText() && this._messageWindow) {
            this._messageWindow.restoreDefaultPlacement();
        }
        _Window_ChoiceList_start.call(this);
    };

    const _Window_ChoiceList_windowY = Window_ChoiceList.prototype.windowY;
    Window_ChoiceList.prototype.windowY = function() {
        if ($gameSystem._balloonMode && !$gameMessage.hasText() && $gameSystem._balloonPos === 3) {
            return Math.floor((Graphics.boxHeight - this.windowHeight()) / 2) + $gameSystem._balloonOffsetY;
        }
        if ($gameSystem._balloonMode && !$gameMessage.hasText()) {
            const id = $gameSystem._balloonTargetId;
            const target = id > 0 ? ($gameMap.event(id) || $gamePlayer) : $gamePlayer;
            const spriteset = SceneManager._scene._spriteset;
            const sprite = spriteset ? spriteset._characterSprites.find(s => s._character === target) : null;
            if (sprite) {
                const footY = sprite.getGlobalPosition().y;
                const headY = footY - _balloonSpriteHeight(sprite);
                const h = this.windowHeight();
                const pos = $gameSystem._balloonPos;
                const below = pos === 2 || (pos === 0 && footY < Graphics.boxHeight / 2);
                if (below) return Math.min(footY + 8, Graphics.boxHeight - h);
                return Math.max(0, headY - h - 8);
            }
        }
        if ($gameSystem._balloonMode && $gameMessage.hasText()) {
            const mw = this._messageWindow;
            const h = this.windowHeight();
            const gap = _balloonParentGap(mw, this);
            return Math.min(mw.y + mw.height + gap.y - BALLOON_CHOICE_OVERLAP, Graphics.boxHeight - h);
        }
        return _Window_ChoiceList_windowY.call(this);
    };

    // 文章の吹き出しがあるときは、選択肢の横位置と幅を吹き出しに合わせる
    const _Window_ChoiceList_windowX = Window_ChoiceList.prototype.windowX;
    Window_ChoiceList.prototype.windowX = function() {
        if ($gameSystem._balloonMode && !$gameMessage.hasText() && $gameSystem._balloonPos === 3) {
            return Math.floor((Graphics.boxWidth - this.windowWidth()) / 2) + $gameSystem._balloonOffsetX;
        }
        if ($gameSystem._balloonMode && $gameMessage.hasText()) {
            const mw = this._messageWindow;
            const w = this.windowWidth();
            const gx = _balloonParentGap(mw, this).x;
            const type = $gameMessage.choicePositionType();
            if (type === 1) return mw.x + gx + Math.floor((mw.width - w) / 2);
            if (type === 2) return mw.x + gx + mw.width - w;
            return mw.x + gx;
        }
        return _Window_ChoiceList_windowX.call(this);
    };

    const _Window_ChoiceList_windowWidth = Window_ChoiceList.prototype.windowWidth;
    Window_ChoiceList.prototype.windowWidth = function() {
        if ($gameSystem._balloonMode && $gameMessage.hasText()) {
            const mw = this._messageWindow;
            if ($gameSystem._balloonFitChoiceW) return mw.width;
            return Math.min(_Window_ChoiceList_windowWidth.call(this), mw.width);
        }
        return _Window_ChoiceList_windowWidth.call(this);
    };

    // 吹き出しの名前ウィンドウにも、文章と同じ半透明の座布団を敷く
    const _Window_NameBox_refresh = Window_NameBox.prototype.refresh;
    Window_NameBox.prototype.refresh = function() {
        _Window_NameBox_refresh.call(this);
        this.contentsBack.clear();
        if ($gameSystem._balloonMode) this.contentsBack.fillAll(CFG_B.textBack);
    };

    const _Window_ChoiceList_maxLines = Window_ChoiceList.prototype.maxLines;
    Window_ChoiceList.prototype.maxLines = function() {
        if ($gameSystem._balloonMode) return $gameSystem._balloonMaxChoices || 3;
        return _Window_ChoiceList_maxLines.call(this);
    };

    // =========================================================================
    // 選択肢の窓の見た目（色はファイルの頭の CHOICE_STYLE）
    // =========================================================================
    Window_ChoiceList.prototype.drawItemBackground = function(index) {
        const S = CHOICE_STYLE;
        const rect = this.itemRect(index);
        if (index === this.index()) {
            this.contentsBack.gradientFillRect(rect.x, rect.y, rect.width, rect.height, S.gradSel1, S.gradSel2, true);
        } else {
            this.contentsBack.gradientFillRect(rect.x, rect.y, rect.width, rect.height, S.gradNor1, S.gradNor2, true);
        }
    };

    Window_ChoiceList.prototype.drawBackgroundRect = function(rect) {};
    Window_ChoiceList.prototype.refreshCursor = function() { this.setCursorRect(0, 0, 0, 0); };

    const _Window_ChoiceList_select = Window_ChoiceList.prototype.select;
    Window_ChoiceList.prototype.select = function(index) {
        const prev = this._index;
        _Window_ChoiceList_select.call(this, index);
        if (prev !== index) this.paint();
    };

    // 選んでいる行の文字は黄色（文字色 14）
    Window_ChoiceList.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const name = this.commandName(index);
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawTextEx(index === this.index() ? `\\C[14]${name}` : name, rect.x, rect.y, rect.width);
        this.changePaintOpacity(true);
    };

})();