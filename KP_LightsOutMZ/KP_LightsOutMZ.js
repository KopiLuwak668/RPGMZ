/*:
 * @target MZ
 * @plugindesc KP Lights Out Puzzle (ランダム初期化機能付き)
 * @author KP
 *
 * @param successSwitch
 * @text 成功時スイッチ
 * @type switch
 * @default 1
 *
 * @command press
 * @text ライツアウト押下
 * @desc イベント名(1〜9)に従い自分と隣接をトグルします。
 * * @command randomize
 * @text ランダム初期化
 * @desc 3〜4箇所をランダムに「押した」状態にして開始します。
 */

(() => {
  const pluginName = "KP_LightsOutMZ";
  const params = PluginManager.parameters(pluginName);
  const SUCCESS_SWITCH_ID = Number(params.successSwitch || 1);

  const neighbors = {
    1: [2,4], 2: [1,3,5], 3: [2,6],
    4: [1,5,7], 5: [2,4,6,8], 6: [3,5,9],
    7: [4,8], 8: [5,7,9], 9: [6,8]
  };

  // --- 既存の押下処理 ---
  PluginManager.registerCommand(pluginName, "press", () => {
    const eventId = $gameMap._interpreter.eventId();
    if (!eventId) return;
    executePress(eventId);
    checkComplete();
  });

  // --- 【新設】ランダム初期化コマンド ---
  PluginManager.registerCommand(pluginName, "randomize", () => {
    // 成功スイッチをオフに戻しておく
    $gameSwitches.setValue(SUCCESS_SWITCH_ID, false);
    
    // 全てのセルフスイッチAを一旦オフ（消灯）にする
    for (const ev of $gameMap.events()) {
      const n = Number(ev.event().name);
      if (n >= 1 && n <= 9) {
        $gameSelfSwitches.setValue([$gameMap.mapId(), ev.eventId(), "A"], false);
      }
    }

    // 3回か4回、ランダムに「押す」
    const times = Math.randomInt(2) + 3; // 3 or 4
    for (let i = 0; i < times; i++) {
      const targetNum = Math.randomInt(9) + 1; // 1〜9
      const targetEvent = $gameMap.events().find(e => Number(e.event().name) === targetNum);
      if (targetEvent) {
        executePress(targetEvent.eventId());
      }
    }
  });

  // 実際のトグル処理を共通化
  function executePress(eventId) {
    const event = $gameMap.event(eventId);
    if (!event) return;
    const num = Number(event.event().name);
    if (!num || num < 1 || num > 9) return;

    toggleSelfA(event);
    for (const n of neighbors[num]) {
      const ev = $gameMap.events().find(e => Number(e.event().name) === n);
      if (ev) toggleSelfA(ev);
    }
  }

  function toggleSelfA(event) {
    const key = [$gameMap.mapId(), event.eventId(), "A"];
    $gameSelfSwitches.setValue(key, !$gameSelfSwitches.value(key));
  }

  function checkComplete() {
    // 全てオン(A=true)になっているかチェック
    const isAllOn = $gameMap.events().every(ev => {
      const n = Number(ev.event().name);
      if (n >= 1 && n <= 9) {
        return $gameSelfSwitches.value([$gameMap.mapId(), ev.eventId(), "A"]);
      }
      return true;
    });

    if (isAllOn) {
      $gameSwitches.setValue(SUCCESS_SWITCH_ID, true);
      AudioManager.playSe({ name: "Switch1", volume: 90, pitch: 100, pan: 0 });
    }
  }
})();