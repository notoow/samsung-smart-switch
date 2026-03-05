const STORAGE_KEY = "s26-switch-checklist-v3";
const MEMO_KEY = "s26-switch-memo-v3";

const STAGES = [
  {
    key: "preflight",
    kicker: "STEP 00",
    title: "개봉 전 준비",
    desc: "처음 10분만 점검해도 실패 가능성을 크게 줄일 수 있습니다.",
    tasks: [
      {
        id: "carrier_sim_protect_off",
        title: "통신사 유심 보호 서비스 가입 여부 확인 후 해지",
        note: "켜진 상태로 유심 이동 시 통화/데이터가 막힐 수 있습니다.",
      },
      {
        id: "kakao_not_installed_new",
        title: "새 폰에 카카오톡이 미리 설치돼 있으면 삭제",
        note: "사전 설치 상태에서는 대화 이전이 꼬일 수 있습니다.",
      },
      {
        id: "kakao_account_ready",
        title: "카카오 계정 정보 확인, 필요 시 채팅 백업 1회",
        note: "자동 이전 실패 대비용 안전장치입니다.",
      },
      {
        id: "case_film_ready",
        title: "필름/케이스 준비",
        note: "개봉 직후 파손 리스크를 줄여줍니다.",
      },
      {
        id: "charge_30plus",
        title: "양쪽 폰 배터리 30% 이상 또는 충전 연결",
        note: "전송 중 전원 부족으로 재시작되는 상황을 막습니다.",
      },
      {
        id: "same_wifi_ready",
        title: "두 폰을 같은 안정적인 Wi-Fi에 연결",
        note: "무선 전송 안정성과 인증 성공률에 유리합니다.",
      },
    ],
  },
  {
    key: "boot",
    kicker: "STEP 01",
    title: "새 폰 첫 부팅",
    desc: "초기 세팅을 길게 하지 말고 홈 화면 진입을 먼저 확보합니다.",
    tasks: [
      {
        id: "power_on_new_phone",
        title: "새 폰 전원 켜고 초기 안내 시작",
        note: "박스 구성품(핀/케이블) 위치도 함께 확인합니다.",
      },
      {
        id: "connect_wifi_only",
        title: "Wi-Fi만 연결하고 나머지 항목은 보류",
        note: "이 단계에서 과한 설정은 충돌 원인이 될 수 있습니다.",
      },
      {
        id: "skip_initial_options",
        title: "복사/잠금/계정 로그인 요청은 우선 건너뛰기",
        note: "전송 완료 후 설정해도 늦지 않습니다.",
      },
      {
        id: "reach_home_first",
        title: "홈 화면까지 우선 진입",
        note: "Smart Switch를 바로 실행할 수 있는 상태를 먼저 만듭니다.",
      },
      {
        id: "install_smart_switch_if_missing",
        title: "Smart Switch가 없으면 설치",
        note: "설정 > 계정 및 백업 > 이전 기기에서 데이터 가져오기",
      },
    ],
  },
  {
    key: "transfer",
    kicker: "STEP 02",
    title: "Smart Switch 전송",
    desc: "가장 오래 걸리는 구간이므로 연결 안정성을 우선합니다.",
    tasks: [
      {
        id: "old_send_new_receive",
        title: "기존 폰: 보내기 / 새 폰: 받기 선택",
        note: "QR 또는 근거리 연결로 시작합니다.",
      },
      {
        id: "choose_wired_if_large",
        title: "10GB 이상이면 유선(C to C) 연결 우선",
        note: "대용량 사진/영상은 유선이 속도와 안정성에서 유리합니다.",
      },
      {
        id: "select_data_scope",
        title: "가져올 데이터 범위 선택",
        note: "불필요 앱 제외 시 전송 시간이 줄어듭니다.",
      },
      {
        id: "copy_google_account",
        title: "구글 계정 복사는 기존 폰 잠금 인증으로 진행",
        note: "비밀번호 재입력 부담을 줄일 수 있습니다.",
      },
      {
        id: "keep_screen_on",
        title: "전송 중 화면 켜짐 유지",
        note: "절전 진입으로 연결이 끊기는 상황을 예방합니다.",
      },
      {
        id: "no_interrupt_during_transfer",
        title: "전송 중 통화/동영상 재생/거리 이탈 최소화",
        note: "중간 끊김이 발생하면 재전송 시간이 크게 늘어납니다.",
      },
      {
        id: "wait_background_install",
        title: "전송 완료 후 백그라운드 앱 설치까지 대기",
        note: "회색 아이콘은 설치 진행 중일 수 있습니다.",
      },
    ],
  },
  {
    key: "sim",
    kicker: "STEP 03",
    title: "유심·eSIM 전환",
    desc: "타이밍만 지켜도 장애를 대부분 피할 수 있습니다.",
    tasks: [
      {
        id: "move_sim_after_transfer",
        title: "유심은 데이터 전송 완료 후 이동",
        note: "전송 도중 통화 수신으로 끊기는 상황을 줄여줍니다.",
      },
      {
        id: "reboot_toggle_airplane",
        title: "장착 후 재부팅 또는 비행기 모드 On/Off 1~2회",
        note: "망 재등록 지연 시 신호를 빠르게 잡는 데 도움이 됩니다.",
      },
      {
        id: "esim_transfer_if_used",
        title: "eSIM 사용자는 Wi-Fi에서 기기 변경 진행",
        note: "통신사 앱/문자 안내 절차를 따릅니다.",
      },
      {
        id: "call_data_sms_test",
        title: "통화/문자/데이터 송수신 테스트",
        note: "통화 1회, 문자 1회, 웹 접속 1회면 기본 점검이 가능합니다.",
      },
      {
        id: "if_no_signal_contact_114",
        title: "신호 미인식 시 114 또는 고객센터 문의",
        note: "자급제 전환 시 유심 락 해제로 해결되는 경우가 많습니다.",
      },
    ],
  },
  {
    key: "verify",
    kicker: "STEP 04",
    title: "핵심 데이터 검증",
    desc: "실사용에 필요한 항목을 빠르게 확인합니다.",
    tasks: [
      {
        id: "check_photos_contacts_msgs",
        title: "사진/연락처/문자 샘플 열람",
        note: "최근 데이터 위주로 직접 열어보면 확인이 빠릅니다.",
      },
      {
        id: "check_kakao_chat_restore",
        title: "카카오톡 대화/첨부파일 로딩 점검",
        note: "문제 시 계정 재로그인 또는 백업 복원으로 확인합니다.",
      },
      {
        id: "reinstall_bank_apps",
        title: "은행/증권/결제 앱 재설치 및 인증",
        note: "신분증과 인증 수단을 먼저 준비하면 편합니다.",
      },
      {
        id: "re_pair_watch_buds_car",
        title: "워치/버즈/차량 블루투스 재연결",
        note: "자동 연결 우선순위까지 확인하면 좋습니다.",
      },
      {
        id: "check_plan_discount_25",
        title: "선택약정(25%) 적용 상태 확인",
        note: "누락 시 요금 손실이 생길 수 있습니다.",
      },
      {
        id: "clean_paid_addons",
        title: "불필요한 유료 부가서비스 정리",
        note: "기기 변경 시점이 점검하기 가장 쉽습니다.",
      },
    ],
  },
  {
    key: "finish",
    kicker: "STEP 05",
    title: "마무리",
    desc: "초기 최적화 후 기존 폰 정리를 진행합니다.",
    tasks: [
      {
        id: "set_lock_biometrics",
        title: "잠금화면/지문/얼굴 인식 설정",
        note: "보안 기본값을 마지막에 확정합니다.",
      },
      {
        id: "set_battery_adaptive",
        title: "배터리 보호(적응형) 및 자동 절전 확인",
        note: "모델/OS 버전에 따라 명칭이 다를 수 있습니다.",
      },
      {
        id: "privacy_display_if_available",
        title: "프라이버시 보호 기능 확인",
        note: "지원 모델에서만 제공될 수 있습니다.",
      },
      {
        id: "insurance_check",
        title: "파손 보험/케어 가입 상태 확인",
        note: "기존 보험 승계가 필요하면 대리점 절차를 확인합니다.",
      },
      {
        id: "keep_old_phone_2days",
        title: "기존 폰 1~2일 보관하며 재검증",
        note: "누락 발견 시 재이전할 시간을 확보합니다.",
      },
      {
        id: "final_backup_then_reset_old",
        title: "최종 백업 확인 후 기존 폰 초기화",
        note: "초기화 전 마지막 점검을 권장합니다.",
      },
      {
        id: "reenable_sim_protection",
        title: "유심 보호 서비스 재가입",
        note: "세팅 완료 후 보안 관점에서 다시 켜두는 편이 좋습니다.",
      },
    ],
  },
];

const CRITICAL_TASK_IDS = new Set([
  "carrier_sim_protect_off",
  "kakao_not_installed_new",
  "charge_30plus",
  "reach_home_first",
  "old_send_new_receive",
  "keep_screen_on",
  "move_sim_after_transfer",
  "keep_old_phone_2days",
]);

const HELP_HINTS = {
  preflight: "유심 보호 설정과 카카오톡 사전 설치 여부를 먼저 확인해 두면 오류를 줄일 수 있습니다.",
  boot: "초기 설정은 간단히 넘기고 홈 화면 진입을 먼저 확보하면 흐름이 매끄럽습니다.",
  transfer: "전송 중에는 두 폰을 가까이 두고 화면 켜짐 유지만 지켜도 안정성이 올라갑니다.",
  sim: "유심 이동 시점을 전송 완료 이후로 맞추는 것이 가장 안전합니다.",
  verify: "사진, 카카오톡, 금융앱 3가지만 우선 점검해도 실사용 문제를 대부분 찾을 수 있습니다.",
  finish: "기존 폰은 바로 초기화하지 않고 하루 이상 확인 후 정리하는 편이 안전합니다.",
};

const checklistRoot = document.getElementById("checklistRoot");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const nextTask = document.getElementById("nextTask");
const riskAlert = document.getElementById("riskAlert");
const coachLine = document.getElementById("coachLine");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importInput = document.getElementById("importInput");
const memoInput = document.getElementById("memoInput");
const clearMemoBtn = document.getElementById("clearMemoBtn");
const stageTemplate = document.getElementById("stageTemplate");
const taskTemplate = document.getElementById("taskTemplate");

const TASKS = STAGES.flatMap((stage) =>
  stage.tasks.map((task) => ({
    ...task,
    stageKey: stage.key,
    stageTitle: stage.title,
  })),
);

const TASK_BY_ID = new Map(TASKS.map((task) => [task.id, task]));
const STAGE_BY_KEY = new Map(STAGES.map((stage) => [stage.key, stage]));

let state = loadState();
let memo = loadMemo();

function initState() {
  const base = {};
  TASKS.forEach((task) => {
    base[task.id] = false;
  });
  return base;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initState();

    const parsed = JSON.parse(raw);
    const base = initState();
    Object.keys(base).forEach((id) => {
      if (typeof parsed[id] === "boolean") {
        base[id] = parsed[id];
      }
    });
    return base;
  } catch (_error) {
    return initState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadMemo() {
  return localStorage.getItem(MEMO_KEY) || "";
}

function saveMemo(value) {
  localStorage.setItem(MEMO_KEY, value);
}

function stageDoneCount(stage) {
  return stage.tasks.reduce((acc, task) => acc + Number(state[task.id]), 0);
}

function updateStageProgress(stageKey) {
  const stage = STAGE_BY_KEY.get(stageKey);
  if (!stage) return;

  const stageNode = checklistRoot.querySelector(`.stage[data-stage-key="${stageKey}"]`);
  if (!stageNode) return;

  const done = stageDoneCount(stage);
  const stageProgressNode = stageNode.querySelector(".stage-progress");
  if (stageProgressNode) {
    stageProgressNode.textContent = `${done} / ${stage.tasks.length} 완료`;
  }
  stageNode.classList.toggle("stage-complete", done === stage.tasks.length);
}

function updateAllStageProgress() {
  STAGES.forEach((stage) => updateStageProgress(stage.key));
}

function onTaskToggle(event) {
  const checkbox = event.target;
  const { taskId } = checkbox.dataset;
  if (!taskId || !Object.hasOwn(state, taskId)) return;

  state[taskId] = checkbox.checked;
  saveState();

  const taskNode = checkbox.closest(".task-item");
  if (taskNode) {
    taskNode.classList.toggle("done", checkbox.checked);
  }

  const taskMeta = TASK_BY_ID.get(taskId);
  if (taskMeta) {
    updateStageProgress(taskMeta.stageKey);
  }

  refreshSummary();
}

function render() {
  checklistRoot.innerHTML = "";

  STAGES.forEach((stage, stageIndex) => {
    const stageNode = stageTemplate.content.firstElementChild.cloneNode(true);
    stageNode.dataset.stageKey = stage.key;
    stageNode.style.setProperty("--order", stageIndex);
    stageNode.querySelector(".stage-kicker").textContent = stage.kicker;
    stageNode.querySelector(".stage-title").textContent = stage.title;
    stageNode.querySelector(".stage-desc").textContent = stage.desc;

    const taskList = stageNode.querySelector(".task-list");
    stage.tasks.forEach((task) => {
      const taskNode = taskTemplate.content.firstElementChild.cloneNode(true);
      taskNode.dataset.taskId = task.id;

      const checkbox = taskNode.querySelector(".task-checkbox");
      const title = taskNode.querySelector(".task-title");
      const note = taskNode.querySelector(".task-note");

      checkbox.checked = Boolean(state[task.id]);
      checkbox.dataset.taskId = task.id;
      checkbox.addEventListener("change", onTaskToggle);

      title.textContent = CRITICAL_TASK_IDS.has(task.id) ? `[필수] ${task.title}` : task.title;
      note.textContent = task.note;

      taskNode.classList.toggle("done", checkbox.checked);
      taskList.appendChild(taskNode);
    });

    checklistRoot.appendChild(stageNode);
  });

  updateAllStageProgress();
}

function refreshSummary() {
  const total = TASKS.length;
  const done = TASKS.reduce((acc, task) => acc + Number(state[task.id]), 0);
  const percent = Math.round((done / total) * 100);

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${done} / ${total} 완료 (${percent}%)`;

  const firstPending = TASKS.find((task) => !state[task.id]);
  if (firstPending) {
    nextTask.textContent = `${firstPending.stageTitle} · ${firstPending.title}`;
    coachLine.textContent =
      HELP_HINTS[firstPending.stageKey] ||
      "현재 단계에서 막히는 항목만 먼저 확인해도 진행이 훨씬 수월해집니다.";
  } else {
    nextTask.textContent = "모든 단계를 완료했습니다. 기존 폰 초기화 전 최종 백업만 한 번 더 확인해 주세요.";
    coachLine.textContent = "완료 상태입니다. 1~2일 실사용 후 문제가 없으면 기존 폰을 정리하면 됩니다.";
  }

  const pendingCritical = TASKS.filter((task) => CRITICAL_TASK_IDS.has(task.id) && !state[task.id]);
  if (pendingCritical.length > 0) {
    const preview = pendingCritical
      .slice(0, 2)
      .map((task) => `'${task.title}'`)
      .join(", ");
    const extra = pendingCritical.length > 2 ? ` 외 ${pendingCritical.length - 2}개` : "";
    riskAlert.hidden = false;
    riskAlert.textContent = `우선 점검 권장: ${preview}${extra}`;
  } else {
    riskAlert.hidden = true;
    riskAlert.textContent = "";
  }
}

function resetChecklist() {
  state = initState();
  saveState();
  render();
  refreshSummary();
}

function exportState() {
  const payload = {
    exportedAt: new Date().toISOString(),
    state,
    memo: memoInput.value,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "s26-switch-progress.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importState(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!parsed || typeof parsed !== "object") {
        throw new Error("invalid");
      }

      const base = initState();
      if (parsed.state && typeof parsed.state === "object") {
        Object.keys(base).forEach((id) => {
          if (typeof parsed.state[id] === "boolean") {
            base[id] = parsed.state[id];
          }
        });
      }

      state = base;
      saveState();

      if (typeof parsed.memo === "string") {
        memo = parsed.memo;
        memoInput.value = parsed.memo;
        saveMemo(parsed.memo);
      }

      render();
      refreshSummary();
    } catch (_error) {
      window.alert("불러오기에 실패했습니다. JSON 파일 형식을 확인해 주세요.");
    }
  };
  reader.readAsText(file);
}

resetBtn.addEventListener("click", () => {
  const shouldReset = window.confirm("체크 상태를 모두 초기화할까요?");
  if (!shouldReset) return;
  resetChecklist();
});

exportBtn.addEventListener("click", exportState);
importBtn.addEventListener("click", () => importInput.click());

importInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importState(file);
  event.target.value = "";
});

memoInput.addEventListener("input", (event) => {
  memo = event.target.value;
  saveMemo(memo);
});

clearMemoBtn.addEventListener("click", () => {
  memo = "";
  memoInput.value = "";
  saveMemo(memo);
});

memoInput.value = memo;
render();
refreshSummary();
