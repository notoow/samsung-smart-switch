const STORAGE_KEY = "s26-switch-checklist-v2";
const MEMO_KEY = "s26-switch-memo-v2";

const STAGES = [
  {
    key: "preflight",
    kicker: "STEP 00",
    title: "박스 뜯기 전 필수 준비",
    desc: "실패를 가장 많이 막아주는 선행 체크입니다.",
    tasks: [
      {
        id: "carrier_sim_protect_off",
        title: "통신사 유심 보호 서비스 가입 여부 확인 후 해지",
        note: "켜진 채 유심 이동 시 통화/데이터 차단될 수 있습니다. 완료 후 재가입 권장",
      },
      {
        id: "kakao_not_installed_new",
        title: "새 폰에 카카오톡이 미리 설치돼 있으면 삭제",
        note: "Smart Switch 연동 시 선설치 상태면 대화 이전이 꼬일 수 있습니다",
      },
      {
        id: "kakao_account_ready",
        title: "카카오 계정(이메일/비밀번호) 확인, 필요 시 채팅 백업 1회",
        note: "자동 이전이 실패해도 복구할 수 있는 이중 안전장치",
      },
      {
        id: "case_film_ready",
        title: "필름/케이스 미리 준비",
        note: "개봉 직후부터 파손 리스크를 줄입니다",
      },
      {
        id: "charge_30plus",
        title: "양쪽 폰 배터리 30% 이상 또는 충전 케이블 연결",
        note: "전송 중 전원 부족으로 재시작되면 처음부터 다시 해야 할 수 있습니다",
      },
      {
        id: "same_wifi_ready",
        title: "두 폰을 같은 안정적인 Wi-Fi에 연결",
        note: "무선 전송 품질과 인증 안정성을 높여 줍니다",
      },
    ],
  },
  {
    key: "boot",
    kicker: "STEP 01",
    title: "새 폰 첫 부팅 (최소 설정)",
    desc: "처음부터 모든 설정을 하지 말고 홈 화면 진입을 우선합니다.",
    tasks: [
      {
        id: "power_on_new_phone",
        title: "새 폰 전원 켜고 초기 안내 시작",
        note: "박스 구성품 핀/케이블 위치도 함께 확인",
      },
      {
        id: "connect_wifi_only",
        title: "Wi-Fi만 연결하고 나머지 항목은 보류",
        note: "초기 단계에서 과도한 설정은 충돌 원인이 됩니다",
      },
      {
        id: "skip_initial_options",
        title: "복사/잠금화면/계정 로그인 요청은 우선 건너뛰기",
        note: "데이터 이전 완료 후 차근히 설정해도 늦지 않습니다",
      },
      {
        id: "reach_home_first",
        title: "최대한 빨리 홈 화면까지 진입",
        note: "Smart Switch 실행 가능한 상태를 먼저 확보",
      },
      {
        id: "install_smart_switch_if_missing",
        title: "Smart Switch가 없으면 스토어 또는 설정 메뉴에서 설치",
        note: "경로: 설정 > 계정 및 백업 > 이전 기기에서 데이터 가져오기",
      },
    ],
  },
  {
    key: "transfer",
    kicker: "STEP 02",
    title: "Smart Switch 데이터 전송",
    desc: "시간을 줄이고 실패를 막는 핵심 구간입니다.",
    tasks: [
      {
        id: "old_send_new_receive",
        title: "기존 폰: 데이터 보내기 / 새 폰: 데이터 받기 선택",
        note: "QR 또는 근거리 인식으로 연결",
      },
      {
        id: "choose_wired_if_large",
        title: "10GB 이상이면 C to C 유선 연결 우선",
        note: "대용량 사진/영상은 유선이 속도와 안정성에서 유리",
      },
      {
        id: "select_data_scope",
        title: "가져올 데이터 범위 선택 (전체 또는 필요한 앱만)",
        note: "불필요 앱을 제외하면 전송 시간 단축 가능",
      },
      {
        id: "copy_google_account",
        title: "구글 계정 복사 요청 시 기존 폰 잠금 인증으로 진행",
        note: "비밀번호 직접 입력보다 빠르게 이전 가능",
      },
      {
        id: "keep_screen_on",
        title: "전송 중 화면 켜짐 유지 옵션 활성화",
        note: "절전 진입으로 연결이 끊기는 상황을 예방",
      },
      {
        id: "no_interrupt_during_transfer",
        title: "전송 중 통화/동영상 재생/거리 이탈 금지",
        note: "중간 끊김 시 재전송 시간이 크게 늘어납니다",
      },
      {
        id: "wait_background_install",
        title: "전송 완료 후에도 백그라운드 앱 설치가 끝날 때까지 대기",
        note: "회색 아이콘은 설치 진행 중 상태일 수 있습니다",
      },
    ],
  },
  {
    key: "sim",
    kicker: "STEP 03",
    title: "유심·eSIM 전환",
    desc: "타이밍을 잘못 잡으면 가장 많이 막히는 단계입니다.",
    tasks: [
      {
        id: "move_sim_after_transfer",
        title: "유심은 데이터 전송이 끝난 뒤에 이동",
        note: "전송 도중 수신 전화로 연결이 끊기는 상황을 방지",
      },
      {
        id: "reboot_toggle_airplane",
        title: "유심 장착 후 재부팅 또는 비행기 모드 On/Off 1~2회",
        note: "망 재등록이 지연될 때 빠르게 신호를 잡는 방법",
      },
      {
        id: "esim_transfer_if_used",
        title: "eSIM 사용자는 Wi-Fi에서 기기 변경 다운로드 진행",
        note: "통신사 앱 또는 안내 문자 절차를 따르세요",
      },
      {
        id: "call_data_sms_test",
        title: "통화/문자/데이터 실제 송수신 테스트",
        note: "통화 1회, 문자 1회, 웹 접속 1회로 기본 기능 확인",
      },
      {
        id: "if_no_signal_contact_114",
        title: "신호 미인식 시 114 또는 고객센터로 유심 락 해제 문의",
        note: "자급제 기기 전환 시 즉시 해결되는 경우가 많습니다",
      },
    ],
  },
  {
    key: "verify",
    kicker: "STEP 04",
    title: "핵심 앱·데이터 검증",
    desc: "실사용에 필요한 기능이 모두 정상인지 점검합니다.",
    tasks: [
      {
        id: "check_photos_contacts_msgs",
        title: "사진/연락처/문자 샘플 열람",
        note: "최근 1년 데이터 위주로 몇 건 직접 열어 확인",
      },
      {
        id: "check_kakao_chat_restore",
        title: "카카오톡 대화/첨부파일 로딩 확인",
        note: "문제 시 계정 재로그인 또는 백업 복원으로 점검",
      },
      {
        id: "reinstall_bank_apps",
        title: "은행/증권/결제 앱 재설치 및 본인 인증",
        note: "신분증, 계좌, 인증 수단을 미리 준비하면 빠릅니다",
      },
      {
        id: "re_pair_watch_buds_car",
        title: "워치/버즈/차량 블루투스 재페어링",
        note: "자동 연결 우선순위까지 점검",
      },
      {
        id: "check_plan_discount_25",
        title: "통신사 앱에서 선택약정(25%) 적용 상태 확인",
        note: "누락 시 요금 손해가 커질 수 있습니다",
      },
      {
        id: "clean_paid_addons",
        title: "불필요한 유료 부가서비스 정리",
        note: "새 기기 전환 시점에 점검하기 가장 좋습니다",
      },
    ],
  },
  {
    key: "finish",
    kicker: "STEP 05",
    title: "마무리 세팅",
    desc: "초기 최적화와 기존 폰 정리까지 완료합니다.",
    tasks: [
      {
        id: "set_lock_biometrics",
        title: "잠금화면/지문/얼굴 인식 설정",
        note: "이 단계에서 보안 설정을 최종 확정",
      },
      {
        id: "set_battery_adaptive",
        title: "배터리 보호 모드(적응형) 및 자동 절전 설정",
        note: "모델/OS 버전에 따라 명칭이 다를 수 있습니다",
      },
      {
        id: "privacy_display_if_available",
        title: "프라이버시 관련 화면 보호 기능 확인",
        note: "지원 모델에서만 제공될 수 있습니다",
      },
      {
        id: "insurance_check",
        title: "삼성케어+ 또는 단말 파손 보험 가입 여부 확인",
        note: "기존 보험 승계가 필요한 경우 대리점 절차 확인",
      },
      {
        id: "keep_old_phone_2days",
        title: "기존 폰은 최소 1~2일 보관하며 재검증",
        note: "전송 누락 발견 시 재이전 가능 시간을 확보",
      },
      {
        id: "final_backup_then_reset_old",
        title: "최종 백업 확인 후 기존 폰 초기화",
        note: "초기화 전 사진/문서/메신저를 마지막 점검",
      },
      {
        id: "reenable_sim_protection",
        title: "유심 보호 서비스 재가입",
        note: "초기 세팅 종료 후 보안 관점에서 다시 켜두기",
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

const COACH_LINES = {
  preflight: "첫 단계가 제일 중요합니다. 유심 보호 해지와 카카오톡 사전설치 여부부터 확인하세요.",
  boot: "초기 설정은 과감히 건너뛰고, 홈 화면 진입부터 완료하면 꼬임이 크게 줄어듭니다.",
  transfer: "데이터 전송 중에는 두 폰을 나란히 두고 화면을 켜둔 채 기다리는 것이 핵심입니다.",
  sim: "유심 이동은 전송 완료 후에만 진행하세요. 타이밍만 지켜도 실패 확률이 크게 줄어듭니다.",
  verify: "사진, 카톡, 금융앱 3가지만 확실히 확인하면 실사용 문제를 대부분 잡을 수 있습니다.",
  finish: "기존 폰은 바로 초기화하지 말고 1~2일 검증 후 정리하면 가장 안전합니다.",
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

let state = loadState();
let memo = loadMemo();

function allTasks() {
  return STAGES.flatMap((stage) =>
    stage.tasks.map((task) => ({
      ...task,
      stageKey: stage.key,
      stageTitle: stage.title,
    })),
  );
}

function initState() {
  const base = {};
  allTasks().forEach((task) => {
    base[task.id] = false;
  });
  return base;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initState();
    }

    const parsed = JSON.parse(raw);
    const base = initState();
    Object.keys(base).forEach((id) => {
      if (typeof parsed[id] === "boolean") {
        base[id] = parsed[id];
      }
    });
    return base;
  } catch (error) {
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

function render() {
  checklistRoot.innerHTML = "";

  STAGES.forEach((stage, stageIndex) => {
    const stageNode = stageTemplate.content.firstElementChild.cloneNode(true);
    stageNode.style.setProperty("--order", stageIndex);
    stageNode.querySelector(".stage-kicker").textContent = stage.kicker;
    stageNode.querySelector(".stage-title").textContent = stage.title;
    stageNode.querySelector(".stage-desc").textContent = stage.desc;

    const doneInStage = stage.tasks.filter((task) => state[task.id]).length;
    stageNode.querySelector(".stage-progress").textContent = `${doneInStage} / ${stage.tasks.length} 완료`;
    if (doneInStage === stage.tasks.length) {
      stageNode.classList.add("stage-complete");
    }

    const taskList = stageNode.querySelector(".task-list");
    stage.tasks.forEach((task) => {
      const taskNode = taskTemplate.content.firstElementChild.cloneNode(true);
      const checkbox = taskNode.querySelector(".task-checkbox");
      const title = taskNode.querySelector(".task-title");
      const note = taskNode.querySelector(".task-note");

      checkbox.checked = !!state[task.id];
      checkbox.dataset.taskId = task.id;
      title.textContent = task.title;
      note.textContent = task.note;

      if (CRITICAL_TASK_IDS.has(task.id)) {
        title.textContent = `[필수] ${task.title}`;
      }

      if (checkbox.checked) {
        taskNode.classList.add("done");
      }

      checkbox.addEventListener("change", (event) => {
        const { taskId } = event.target.dataset;
        state[taskId] = event.target.checked;
        saveState();
        render();
        refreshSummary();
      });

      taskList.appendChild(taskNode);
    });

    checklistRoot.appendChild(stageNode);
  });
}

function refreshSummary() {
  const tasks = allTasks();
  const total = tasks.length;
  const done = tasks.filter((task) => state[task.id]).length;
  const percent = Math.round((done / total) * 100);

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${done} / ${total} 완료 (${percent}%)`;

  const firstPending = tasks.find((task) => !state[task.id]);
  if (firstPending) {
    nextTask.textContent = `${firstPending.stageTitle} - ${firstPending.title}`;
    coachLine.textContent = COACH_LINES[firstPending.stageKey] || "한 단계씩 체크하면 안전하게 이전을 완료할 수 있습니다.";
  } else {
    nextTask.textContent = "모든 단계를 완료했습니다. 기존 폰 초기화 전에 최종 백업만 다시 확인하세요.";
    coachLine.textContent = "완료 상태입니다. 2~3일 실사용하면서 누락 데이터가 없는지 마지막 확인만 해 주세요.";
  }

  const pendingCritical = tasks.filter(
    (task) => CRITICAL_TASK_IDS.has(task.id) && !state[task.id],
  );

  if (pendingCritical.length > 0) {
    riskAlert.hidden = false;
    const preview = pendingCritical
      .slice(0, 2)
      .map((task) => `'${task.title}'`)
      .join(", ");
    const extra = pendingCritical.length > 2 ? ` 외 ${pendingCritical.length - 2}개` : "";
    riskAlert.textContent = `우선 완료 필요: ${preview}${extra}`;
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

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
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
      const parsed = JSON.parse(reader.result);
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
        memoInput.value = parsed.memo;
        saveMemo(parsed.memo);
      }

      render();
      refreshSummary();
    } catch (error) {
      window.alert("불러오기에 실패했습니다. JSON 파일 형식을 확인해 주세요.");
    }
  };
  reader.readAsText(file);
}

resetBtn.addEventListener("click", () => {
  const shouldReset = window.confirm("체크 상태를 모두 초기화할까요?");
  if (!shouldReset) {
    return;
  }
  resetChecklist();
});

exportBtn.addEventListener("click", exportState);
importBtn.addEventListener("click", () => importInput.click());
importInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) {
    importState(file);
  }
  event.target.value = "";
});

memoInput.addEventListener("input", (event) => {
  memo = event.target.value;
  saveMemo(memo);
});

clearMemoBtn.addEventListener("click", () => {
  memoInput.value = "";
  memo = "";
  saveMemo(memo);
});

memoInput.value = memo;
render();
refreshSummary();
