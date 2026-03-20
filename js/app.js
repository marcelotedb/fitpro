/* ═══════════════════════════════════════════════
   FITPRO — LÓGICA PRINCIPAL DO APLICATIVO
   ═══════════════════════════════════════════════ */

const App = (() => {

  /* ─── Estado global ─── */
  let state = {
    user: null,        // Dados do usuário
    plan: null,        // Plano semanal gerado
    diary: [],         // Histórico de treinos
    parqAnswers: {},
    currentGoal: null,
    todayWorkout: null,
    currentExerciseIdx: 0,
    workoutStartTime: null,
    workoutRpe: null,
    libFilter: 'all',
    currentModal: null,
    selectedDays: [],
  };

  /* ─── Persistência ─── */
  const save  = () => { try { localStorage.setItem('fitpro_state', JSON.stringify(state)); } catch(e){} };
  const load  = () => {
    try {
      const raw = localStorage.getItem('fitpro_state');
      if (raw) { state = { ...state, ...JSON.parse(raw) }; return true; }
    } catch(e) {}
    return false;
  };

  /* ─── Navegação ─── */
  const NAV_SCREENS = ['dashboard','library','nutrition','diary','profile'];

  function goTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + id);
    if (el) { el.classList.add('active'); el.scrollTop = 0; }
    const nav = document.getElementById('bottom-nav');
    if (NAV_SCREENS.includes(id)) {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }
    if (id === 'dashboard')   renderDashboard();
    if (id === 'library')     renderLibrary();
    if (id === 'nutrition')   renderNutrition();
    if (id === 'diary')       renderDiary();
    if (id === 'achievements') renderAchievements();
    if (id === 'profile')     renderProfile();
  }

  function navTo(screen, btn) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    goTo(screen);
  }

  function loadExisting() {
    if (load() && state.user) {
      applyTheme(state.user.goal);
      goTo('dashboard');
    } else {
      toast('Nenhuma conta encontrada. Faça o cadastro!');
    }
  }

  /* ─── PAR-Q ─── */
  function renderParq() {
    const container = document.getElementById('parq-questions');
    container.innerHTML = DB.parqQuestions.map((q, i) => `
      <div class="parq-q" id="pq-${q.id}">
        <p>${i + 1}. ${q.text}</p>
        <div class="parq-options">
          <button class="parq-opt" data-val="no"  onclick="App.answerParq('${q.id}','no',this)">Não</button>
          <button class="parq-opt" data-val="yes" onclick="App.answerParq('${q.id}','yes',this)">Sim</button>
        </div>
      </div>
    `).join('');
  }

  function answerParq(id, val, btn) {
    state.parqAnswers[id] = val;
    const wrap = btn.closest('.parq-q');
    wrap.querySelectorAll('.parq-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function submitParq() {
    const answered = Object.keys(state.parqAnswers).length;
    if (answered < DB.parqQuestions.length) {
      toast('Responda todas as perguntas antes de continuar.');
      return;
    }
    const hasRisk = Object.values(state.parqAnswers).some(v => v === 'yes');
    if (hasRisk) {
      const ok = confirm('⚠️ Você respondeu "Sim" a uma ou mais perguntas.\n\nRecomendamos consultar um médico antes de iniciar atividade física intensa.\n\nDeseja continuar mesmo assim?');
      if (!ok) return;
    }
    goTo('register');
  }

  /* ─── CADASTRO ─── */
  function selectOption(card) {
    const group = card.dataset.group;
    document.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  }

  function toggleDay(btn) {
    btn.classList.toggle('active');
    const day = btn.dataset.day;
    if (btn.classList.contains('active')) {
      if (!state.selectedDays.includes(day)) state.selectedDays.push(day);
    } else {
      state.selectedDays = state.selectedDays.filter(d => d !== day);
    }
  }

  function getSelectedOptions() {
    const result = {};
    document.querySelectorAll('.option-card.selected').forEach(c => {
      result[c.dataset.group] = c.dataset.value;
    });
    return result;
  }

  function getEquipment() {
    return Array.from(document.querySelectorAll('#equipment-grid input:checked')).map(i => i.value);
  }

  function submitRegister() {
    const name   = document.getElementById('r-name').value.trim();
    const age    = parseInt(document.getElementById('r-age').value);
    const gender = document.getElementById('r-gender').value;
    const weight = parseFloat(document.getElementById('r-weight').value);
    const height = parseFloat(document.getElementById('r-height').value);
    const opts   = getSelectedOptions();
    const equip  = getEquipment();

    if (!name || !age || !gender || !weight || !height) { toast('Preencha todos os dados pessoais.'); return; }
    if (!opts.level) { toast('Selecione seu nível de condicionamento.'); return; }
    if (state.selectedDays.length === 0) { toast('Selecione pelo menos 1 dia por semana.'); return; }
    if (!opts.duration) { toast('Selecione o tempo por sessão.'); return; }
    if (equip.length === 0) { toast('Selecione ao menos um equipamento disponível.'); return; }

    const imc     = weight / ((height / 100) ** 2);
    const fatPct  = estimateFatPct(imc, age, gender);

    state.user = {
      name, age, gender, weight, height, imc, fatPct,
      level: opts.level,
      duration: parseInt(opts.duration),
      days: state.selectedDays,
      equipment: equip,
      injuries: document.getElementById('r-injuries').value.trim(),
      parq: state.parqAnswers,
      goal: null,
      weightHistory: [{ date: today(), value: weight }],
      registeredAt: Date.now(),
    };
    save();
    goTo('goal');
  }

  function estimateFatPct(imc, age, gender) {
    // Fórmula de Deurenberg
    const s = gender === 'M' ? 1 : 0;
    return (1.20 * imc) + (0.23 * age) - (10.8 * s) - 5.4;
  }

  /* ─── SELEÇÃO DE OBJETIVO ─── */
  function selectGoal(goal) {
    state.user.goal = goal;
    save();
    showGenerating(goal);
  }

  function showGenerating(goal) {
    goTo('generating');
    const steps = [
      'Analisando perfil do usuário...',
      'Calculando volume ideal de treino...',
      'Selecionando exercícios compatíveis...',
      'Montando periodização semanal...',
      'Calculando métricas nutricionais...',
      'Finalizando plano personalizado...',
    ];
    const container = document.getElementById('gen-steps');
    container.innerHTML = steps.map(s => `<div class="gen-step">⏳ ${s}</div>`).join('');
    const stepEls = container.querySelectorAll('.gen-step');
    let i = 0;
    const interval = setInterval(() => {
      if (i < stepEls.length) {
        stepEls[i].innerHTML = `✅ ${steps[i]}`;
        stepEls[i].classList.add('done');
        i++;
      } else {
        clearInterval(interval);
        generatePlan();
        applyTheme(goal);
        goTo('dashboard');
      }
    }, 400);
  }

  /* ─── GERAÇÃO DO PLANO ─── */
  function generatePlan() {
    const { goal, level, days } = state.user;
    const program = DB.programs[goal];
    const split   = program.splits[level];
    const sessions = split.sessions;

    // Mapeia dias da semana para sessões (ciclicamente)
    const allDays = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
    const plan = {};
    allDays.forEach(d => { plan[d] = { rest: true }; });

    let sessionIdx = 0;
    days.forEach(d => {
      if (sessionIdx < sessions.length) {
        const sess = sessions[sessionIdx % sessions.length];
        plan[d] = { ...sess, rest: false, exercises: filterExercises(sess.exercises) };
        sessionIdx++;
      }
    });

    state.plan = { goal, level, split: split.type, days: plan, program };
    save();
  }

  function filterExercises(ids) {
    const { equipment, duration, age } = state.user;
    return ids.filter(id => {
      const ex = getExercise(id);
      if (!ex) return false;
      // Filtra por equipamento disponível
      const hasEquip = ex.equipment.some(e => equipment.includes(e));
      // Para idade 40+: remove exercícios de alto impacto se necessário
      if (age >= 40 && ['clap_pushup','box_jump'].includes(id)) {
        return hasEquip && equipment.includes('gym');
      }
      return hasEquip;
    });
  }

  function regeneratePlan() { generatePlan(); renderDashboard(); toast('Plano regenerado!'); }

  /* ─── DASHBOARD ─── */
  function renderDashboard() {
    if (!state.user || !state.plan) return;
    const { user, plan, diary } = state;

    // Cabeçalho
    document.getElementById('dash-name').textContent = user.name;
    document.getElementById('dash-goal-label').textContent = DB.programs[user.goal]?.name || '';
    document.getElementById('dash-avatar').textContent = DB.programs[user.goal]?.icon || '⚡';

    // Estatísticas
    document.getElementById('stat-streak').textContent = calcStreak();
    document.getElementById('stat-total').textContent  = diary.length;
    document.getElementById('stat-cal').textContent    = formatNum(diary.reduce((s, d) => s + (d.calories || 0), 0));
    document.getElementById('stat-vol').textContent    = formatNum(diary.reduce((s, d) => s + (d.volume || 0), 0));

    // IMC
    const imc = user.imc;
    document.getElementById('imc-value').textContent = imc.toFixed(1);
    const cls = imcClass(imc);
    document.getElementById('imc-class').textContent = cls.label;
    document.getElementById('imc-class').style.color = cls.color;
    document.getElementById('imc-indicator').style.left = imcPosition(imc) + '%';

    // Plano semanal
    renderWeeklyPlan();

    // Treino de hoje
    renderTodayWorkout();
  }

  function renderWeeklyPlan() {
    const allDays = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
    const todayDay = dayOfWeek();
    const container = document.getElementById('weekly-plan');
    container.innerHTML = allDays.map(d => {
      const sess = state.plan.days[d];
      const isToday = d === todayDay;
      const cls = sess?.rest ? 'rest' : (isToday ? 'today' : '');
      const color = sess?.rest ? '💤' : DB.programs[state.user.goal]?.icon || '⚡';
      const label = sess?.rest ? 'Descanso' : (sess?.label || '—');
      const type  = sess?.rest ? '' : (sess?.type || '');
      return `
        <div class="week-day-row ${cls}">
          <span class="wdr-day">${d}</span>
          <div class="wdr-badge" style="background:${sess?.rest ? 'transparent' : DB.programs[state.user.goal]?.color + '30'}">${color}</div>
          <span class="wdr-label">${label}</span>
          <span class="wdr-type">${type}</span>
        </div>`;
    }).join('');
  }

  function renderTodayWorkout() {
    const todayDay = dayOfWeek();
    const sess = state.plan?.days[todayDay];
    const container = document.getElementById('today-exercises');
    const startBtn = document.getElementById('start-workout-btn');

    if (!sess || sess.rest) {
      document.getElementById('today-label').textContent = 'Dia de Descanso 😴';
      document.getElementById('today-type').textContent = '—';
      container.innerHTML = '<p style="color:var(--text2);font-size:.9rem;padding:12px 0">Aproveite para recuperar e alongar!</p>';
      startBtn.style.display = 'none';
      return;
    }

    document.getElementById('today-label').textContent = sess.label || 'Treino de Hoje';
    document.getElementById('today-type').textContent  = sess.type || '';
    startBtn.style.display = 'block';

    const exs = (sess.exercises || []).slice(0, 6);
    container.innerHTML = exs.map((id, i) => {
      const ex = getExercise(id);
      if (!ex) return '';
      return `
        <div class="today-ex-row" onclick="App.openExerciseModal('${id}')">
          <span class="tex-num">${i + 1}</span>
          <span style="font-size:1.1rem">${ex.emoji}</span>
          <span class="tex-name">${ex.name}</span>
          <span class="tex-info">${ex.sets} × ${ex.reps}</span>
        </div>`;
    }).join('');
    state.todayWorkout = sess;
  }

  /* ─── TREINO ATIVO ─── */
  function startWorkout() {
    if (!state.todayWorkout) return;
    state.currentExerciseIdx = 0;
    state.workoutStartTime   = Date.now();
    state.workoutRpe         = null;
    goTo('workout');
    applyWorkoutTheme();
    renderActiveExercise();
    Timer.startGlobal();
  }

  function applyWorkoutTheme() {
    const color = DB.programs[state.user.goal]?.color || '#6366f1';
    document.getElementById('workout-header').style.background = `linear-gradient(135deg, ${color}20, var(--bg2))`;
  }

  function renderActiveExercise() {
    const sess = state.todayWorkout;
    const ids  = sess.exercises || [];
    const total = ids.length;
    const idx   = state.currentExerciseIdx;
    const id    = ids[idx];
    const ex    = getExercise(id);
    if (!ex) return;

    document.getElementById('wk-title').textContent    = sess.label || 'Treino';
    document.getElementById('wk-progress').textContent = `Exercício ${idx + 1} de ${total}`;
    document.getElementById('wk-progress-fill').style.width = `${((idx + 1) / total) * 100}%`;

    document.getElementById('ex-number').textContent   = `Exercício ${idx + 1} / ${total}`;
    document.getElementById('ex-emoji').textContent    = ex.emoji;
    document.getElementById('ex-name').textContent     = ex.name;
    document.getElementById('ex-muscle').textContent   = `${ex.muscle} — Primário`;
    document.getElementById('ex-sets').textContent     = ex.sets;
    document.getElementById('ex-reps').textContent     = ex.reps;
    document.getElementById('ex-rest').textContent     = ex.rest;
    document.getElementById('ex-tip-text').textContent = ex.tips;

    // Carga sugerida
    const diary = state.diary.filter(d => d.exercises?.some(e => e.id === id));
    const lastLoad = diary.length ? diary[diary.length - 1].exercises?.find(e => e.id === id)?.load : null;
    document.getElementById('ex-load').textContent = lastLoad ? lastLoad + 'kg' : '—';

    // Alerta de segurança
    const alertEl = document.getElementById('ex-alert');
    if (ex.safety) {
      alertEl.style.display = 'flex';
      document.getElementById('ex-alert-text').textContent = ex.safety;
    } else {
      alertEl.style.display = 'none';
    }

    // Sets tracker
    renderSetsTracker(ex);
  }

  function renderSetsTracker(ex) {
    const setsNum = parseInt(ex.sets?.split('-')[0]) || 3;
    const repsNum = ex.reps;
    const container = document.getElementById('sets-tracker');
    container.innerHTML = Array.from({ length: setsNum }, (_, i) => `
      <div class="set-row" id="set-row-${i}">
        <span class="set-num">Série ${i + 1}</span>
        <input class="set-input" type="number" id="set-load-${i}" placeholder="kg" min="0"/>
        <span class="set-x">×</span>
        <input class="set-input" type="number" id="set-reps-${i}" placeholder="${repsNum}" min="0"/>
        <button class="set-done-btn" id="set-btn-${i}" onclick="App.toggleSetDone(${i})">✓</button>
      </div>
    `).join('');
  }

  function toggleSetDone(i) {
    const btn = document.getElementById(`set-btn-${i}`);
    btn.classList.toggle('done');
    if (btn.classList.contains('done')) {
      document.getElementById(`set-row-${i}`).style.opacity = '.6';
      Timer.startRest();
    }
  }

  function getCurrentExerciseData() {
    const sess = state.todayWorkout;
    const id   = sess?.exercises?.[state.currentExerciseIdx];
    const ex   = getExercise(id);
    if (!ex) return null;
    const setsNum = parseInt(ex.sets?.split('-')[0]) || 3;
    const sets = Array.from({ length: setsNum }, (_, i) => ({
      id,
      load: parseFloat(document.getElementById(`set-load-${i}`)?.value) || 0,
      reps: parseInt(document.getElementById(`set-reps-${i}`)?.value) || 0,
      done: document.getElementById(`set-btn-${i}`)?.classList.contains('done') || false,
    }));
    return { id, sets };
  }

  function nextExercise() {
    const data = getCurrentExerciseData();
    if (data && !state._sessionData) state._sessionData = [];
    if (data) state._sessionData.push(data);
    const ids = state.todayWorkout.exercises || [];
    if (state.currentExerciseIdx < ids.length - 1) {
      state.currentExerciseIdx++;
      renderActiveExercise();
      Timer.reset();
    } else {
      finishWorkoutScreen();
    }
  }

  function prevExercise() {
    if (state.currentExerciseIdx > 0) {
      state.currentExerciseIdx--;
      renderActiveExercise();
      Timer.reset();
    }
  }

  function exitWorkout() {
    if (confirm('Deseja sair do treino? O progresso não será salvo.')) {
      Timer.stop();
      goTo('dashboard');
    }
  }

  function finishWorkoutScreen() {
    Timer.stop();
    const duration = Math.round((Date.now() - state.workoutStartTime) / 1000);
    const mins     = Math.floor(duration / 60);
    const secs     = duration % 60;
    const exCount  = state.todayWorkout.exercises?.length || 0;

    // Estimativa calórica
    const goal     = state.user.goal;
    const weight   = state.user.weight;
    const calPerMin = goal === 'weightloss' ? 9 : goal === 'soccer' ? 10 : goal === 'sports' ? 8 : 6;
    const calories  = Math.round(mins * calPerMin * (weight / 70));

    // Volume total estimado
    const volume = (state._sessionData || []).reduce((sum, d) => {
      return sum + d.sets.reduce((s2, set) => s2 + (set.load * set.reps), 0);
    }, 0);

    document.getElementById('done-time').textContent      = `${mins}:${String(secs).padStart(2,'0')}`;
    document.getElementById('done-exercises').textContent = exCount;
    document.getElementById('done-cal').textContent       = calories;
    document.getElementById('done-vol').textContent       = Math.round(volume);

    // Badges
    renderDoneBadges(mins, calories);
    goTo('workout-done');

    // Guarda temporariamente para salvar
    state._pendingWorkout = { duration, calories, volume, exercises: state._sessionData || [] };
  }

  function renderDoneBadges(mins, cal) {
    const badges = [];
    if (mins >= 45) badges.push('⏱️ Mais de 45 min');
    if (cal >= 400) badges.push('🔥 +400 kcal');
    if ((state._sessionData || []).length >= 6) badges.push('💪 6+ exercícios');
    document.getElementById('done-badges').innerHTML = badges.map(b => `<span class="badge-item">${b}</span>`).join('');
  }

  function setRpe(val) {
    state.workoutRpe = val;
    document.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.rpe-btn[data-rpe="${val}"]`)?.classList.add('selected');
    const labels = { 1:'Muito fácil 😴', 3:'Fácil 😊', 5:'Moderado 😤', 7:'Difícil 😰', 9:'Muito difícil 🥵', 10:'Exaustão total 💀' };
    document.getElementById('rpe-label').textContent = labels[val] || `RPE ${val}/10`;

    // Ajuste dinâmico de volume baseado em fadiga
    if (val >= 9 && state.plan) {
      toast('⚠️ Fadiga elevada detectada! O app pode sugerir deload na próxima sessão.');
    }
  }

  function finishWorkout() {
    const pw = state._pendingWorkout;
    if (!pw) { goTo('dashboard'); return; }

    const entry = {
      id:        Date.now(),
      date:      new Date().toISOString(),
      label:     state.todayWorkout?.label || 'Treino',
      goal:      state.user.goal,
      duration:  pw.duration,
      calories:  pw.calories,
      volume:    Math.round(pw.volume),
      exercises: pw.exercises,
      rpe:       state.workoutRpe,
    };

    state.diary.unshift(entry);
    state._sessionData    = null;
    state._pendingWorkout = null;

    // XP
    if (!state.user.xp) state.user.xp = 0;
    state.user.xp += 50 + (state.workoutRpe ? state.workoutRpe * 5 : 25);

    // Verifica conquistas
    checkAchievements();
    save();
    toast('🏆 Treino salvo! +' + (50 + (state.workoutRpe ? state.workoutRpe * 5 : 25)) + ' XP');
    goTo('dashboard');
  }

  /* ─── BIBLIOTECA ─── */
  function renderLibrary() {
    renderLibraryList();
  }

  function renderLibraryList() {
    const search = (document.getElementById('lib-search')?.value || '').toLowerCase();
    const filter = state.libFilter || 'all';
    const list   = document.getElementById('library-list');

    const filtered = DB.exercises.filter(ex => {
      const matchFilter = filter === 'all' || ex.muscleGroup === filter;
      const matchSearch = !search || ex.name.toLowerCase().includes(search) || ex.muscle.toLowerCase().includes(search);
      return matchFilter && matchSearch;
    });

    if (!filtered.length) {
      list.innerHTML = '<p class="empty-state">Nenhum exercício encontrado.</p>';
      return;
    }

    list.innerHTML = filtered.map(ex => `
      <div class="ex-lib-card" onclick="App.openExerciseModal('${ex.id}')">
        <span class="ex-lib-emoji">${ex.emoji}</span>
        <div class="ex-lib-info">
          <div class="ex-lib-name">${ex.name}</div>
          <div class="ex-lib-meta">${ex.muscle} · ${ex.equipment.join(', ')}</div>
          <div class="ex-lib-tags">
            ${ex.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <span class="ex-lib-level level-${ex.level}">${levelLabel(ex.level)}</span>
      </div>
    `).join('');
  }

  function filterLibrary() { renderLibraryList(); }
  function setLibFilter(filter, btn) {
    state.libFilter = filter;
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderLibraryList();
  }

  /* ─── MODAL DE EXERCÍCIO ─── */
  function openExerciseModal(id) {
    const ex = getExercise(id);
    if (!ex) return;
    state.currentModal = id;

    document.getElementById('modal-emoji').textContent         = ex.emoji;
    document.getElementById('modal-name').textContent          = ex.name;
    document.getElementById('modal-muscle').textContent        = ex.muscle;
    document.getElementById('modal-level').textContent         = levelLabel(ex.level);
    document.getElementById('modal-equip').textContent         = ex.equipment.join(', ');
    document.getElementById('modal-execution').textContent     = ex.execution;
    document.getElementById('modal-safety').textContent        = ex.safety;
    document.getElementById('modal-variations').textContent    = ex.variations;

    document.getElementById('modal-params').innerHTML = `
      <div class="modal-param"><span>${ex.sets}</span><span>Séries</span></div>
      <div class="modal-param"><span>${ex.reps}</span><span>Reps</span></div>
      <div class="modal-param"><span>${ex.rest}</span><span>Descanso</span></div>
    `;

    document.getElementById('modal-exercise').classList.add('open');
  }

  function closeModal() {
    document.getElementById('modal-exercise').classList.remove('open');
    state.currentModal = null;
  }

  function openVideo() {
    const ex = getExercise(state.currentModal);
    toast(`🎬 Busque por "${ex?.name} execução correta" no YouTube para ver a demonstração.`);
  }

  /* ─── NUTRIÇÃO ─── */
  function renderNutrition() {
    if (!state.user) return;
    const tdee = calcTdee();
    const goal = state.user.goal;
    const target = calcTarget(tdee, goal);
    const macros = calcMacros(target, state.user.weight, goal);

    document.getElementById('tdee-value').textContent   = formatNum(tdee);
    document.getElementById('target-value').textContent = formatNum(target);
    document.getElementById('nutrition-hero').style.background = goalCardBg(goal);

    // Macros
    document.getElementById('macros-grid').innerHTML = `
      <div class="macro-box">
        <div class="macro-circle macro-protein">
          <span class="macro-val">${macros.protein}g</span>
          <span class="macro-unit">proteína</span>
        </div>
        <div class="macro-name">Proteína</div>
        <div class="macro-kcal">${macros.protein * 4} kcal</div>
      </div>
      <div class="macro-box">
        <div class="macro-circle macro-carb">
          <span class="macro-val">${macros.carb}g</span>
          <span class="macro-unit">carbo</span>
        </div>
        <div class="macro-name">Carboidrato</div>
        <div class="macro-kcal">${macros.carb * 4} kcal</div>
      </div>
      <div class="macro-box">
        <div class="macro-circle macro-fat">
          <span class="macro-val">${macros.fat}g</span>
          <span class="macro-unit">gordura</span>
        </div>
        <div class="macro-name">Gordura</div>
        <div class="macro-kcal">${macros.fat * 9} kcal</div>
      </div>
    `;

    // Dicas
    const tips = DB.nutritionTips[goal] || [];
    document.getElementById('nutrition-tips').innerHTML = tips.map(t => `
      <div class="nutrition-tip">
        <strong>${t.title}</strong>
        <p>${t.body}</p>
      </div>
    `).join('');
  }

  function calcTdee() {
    if (!state.user) return 0;
    const { weight, height, age, gender } = state.user;
    const activityLevel = parseFloat(document.getElementById('activity-level')?.value || 1.55);
    // Harris-Benedict revisada (Mifflin-St Jeor)
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'M') bmr += 5; else bmr -= 161;
    return Math.round(bmr * activityLevel);
  }

  function calcTarget(tdee, goal) {
    const deltas = { hypertrophy: 300, weightloss: -400, soccer: 200, sports: 0 };
    return tdee + (deltas[goal] || 0);
  }

  function calcMacros(kcal, weight, goal) {
    const proteinMultipliers = { hypertrophy: 2.0, weightloss: 2.3, soccer: 1.8, sports: 1.9 };
    const protein = Math.round(weight * (proteinMultipliers[goal] || 2.0));
    const fat     = Math.round(kcal * 0.25 / 9);
    const carb    = Math.round((kcal - protein * 4 - fat * 9) / 4);
    return { protein: Math.max(protein, 50), carb: Math.max(carb, 50), fat: Math.max(fat, 30) };
  }

  function recalcTdee() { renderNutrition(); }

  /* ─── DIÁRIO ─── */
  function renderDiary() {
    renderDiaryChart();
    const list = document.getElementById('diary-list');
    if (!state.diary.length) {
      list.innerHTML = '<p class="empty-state">Nenhum treino registrado ainda. Comece seu primeiro treino!</p>';
      return;
    }
    list.innerHTML = state.diary.slice(0, 20).map(entry => {
      const date = new Date(entry.date);
      const rpeColor = rpeToColor(entry.rpe);
      return `
        <div class="diary-entry">
          <div class="diary-entry-header">
            <span class="diary-entry-title">${entry.label}</span>
            <span class="diary-entry-date">${formatDate(date)}</span>
          </div>
          <div class="diary-entry-stats">
            <span class="diary-stat">⏱️ <strong>${Math.floor(entry.duration/60)}min</strong></span>
            <span class="diary-stat">🔥 <strong>${entry.calories}kcal</strong></span>
            <span class="diary-stat">💪 <strong>${entry.volume}kg</strong></span>
          </div>
          ${entry.rpe ? `
            <div class="diary-rpe">
              <div class="rpe-dot" style="background:${rpeColor}"></div>
              <span style="font-size:.78rem;color:var(--text2)">RPE ${entry.rpe}/10 — ${rpeLabel(entry.rpe)}</span>
            </div>` : ''}
        </div>`;
    }).join('');
  }

  function renderDiaryChart() {
    const allDays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const today   = new Date();
    const chartEl = document.getElementById('diary-chart');

    const bars = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (13 - i));
      const label = allDays[d.getDay()];
      const iso   = d.toISOString().split('T')[0];
      const had   = state.diary.some(e => e.date.startsWith(iso));
      return { label, had };
    });

    chartEl.innerHTML = `
      <div style="display:flex;flex-direction:column;width:100%">
        <div style="display:flex;gap:4px;align-items:flex-end;height:50px">
          ${bars.map(b => `<div class="chart-bar ${b.had ? 'filled' : ''}" style="height:${b.had ? '100%' : '20%'}"></div>`).join('')}
        </div>
        <div style="display:flex;gap:4px;margin-top:4px">
          ${bars.map(b => `<div class="chart-bar-label" style="flex:1">${b.label[0]}</div>`).join('')}
        </div>
        <div style="font-size:.72rem;color:var(--text2);margin-top:8px">Últimas 2 semanas</div>
      </div>
    `;
  }

  /* ─── CONQUISTAS ─── */
  function checkAchievements() {
    if (!state.user) return;
    if (!state.user.achievements) state.user.achievements = [];
    const d = state.diary;
    const u = state.user;

    DB.achievements.forEach(ach => {
      if (state.user.achievements.includes(ach.id)) return;
      let unlocked = false;
      if (ach.type === 'workouts' && d.length >= ach.threshold) unlocked = true;
      if (ach.type === 'streak'   && calcStreak() >= ach.threshold) unlocked = true;
      if (ach.type === 'volume'   && d.reduce((s, e) => s + e.volume, 0) >= ach.threshold) unlocked = true;
      if (ach.type === 'calories' && d.reduce((s, e) => s + e.calories, 0) >= ach.threshold) unlocked = true;
      if (ach.type === 'early') {
        const h = new Date().getHours();
        if (h < 8) unlocked = true;
      }
      if (ach.type === 'late') {
        const h = new Date().getHours();
        if (h >= 21) unlocked = true;
      }
      if (unlocked) {
        state.user.achievements.push(ach.id);
        state.user.xp = (state.user.xp || 0) + ach.xp;
        toast(`🏆 Conquista desbloqueada: ${ach.name}! +${ach.xp} XP`);
      }
    });
  }

  function renderAchievements() {
    if (!state.user) return;
    const unlocked = state.user.achievements || [];
    const xp = state.user.xp || 0;
    const lvl = getLevel(xp);

    document.getElementById('xp-total').textContent    = formatNum(xp);
    document.getElementById('user-level-badge').textContent = lvl.badge;
    document.getElementById('user-level-name').textContent  = lvl.name;

    document.getElementById('achievements-grid').innerHTML = DB.achievements.map(ach => {
      const isUnlocked = unlocked.includes(ach.id);
      return `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <span class="ach-icon">${ach.icon}</span>
          <div class="ach-name">${ach.name}</div>
          <div class="ach-desc">${ach.desc}</div>
          <div class="ach-xp">+${ach.xp} XP</div>
        </div>`;
    }).join('');
  }

  /* ─── PERFIL ─── */
  function renderProfile() {
    if (!state.user) return;
    const u = state.user;
    const prog = DB.programs[u.goal];

    document.getElementById('profile-avatar').textContent  = prog?.icon || '⚡';
    document.getElementById('profile-name').textContent    = u.name;
    document.getElementById('profile-goal-tag').textContent = prog?.name || '—';

    const lvl = getLevel(u.xp || 0);
    document.getElementById('profile-stats').innerHTML = `
      <div class="profile-stat-box">
        <span class="psb-val">${u.imc?.toFixed(1) || '—'}</span>
        <span class="psb-label">IMC</span>
      </div>
      <div class="profile-stat-box">
        <span class="psb-val">${u.weight}kg</span>
        <span class="psb-label">Peso</span>
      </div>
      <div class="profile-stat-box">
        <span class="psb-val">${u.fatPct?.toFixed(1) || '—'}%</span>
        <span class="psb-label">% Gordura est.</span>
      </div>
      <div class="profile-stat-box">
        <span class="psb-val">${lvl.badge} ${lvl.name}</span>
        <span class="psb-label">${formatNum(u.xp || 0)} XP</span>
      </div>
      <div class="profile-stat-box">
        <span class="psb-val">${state.diary.length}</span>
        <span class="psb-label">Treinos</span>
      </div>
      <div class="profile-stat-box">
        <span class="psb-val">${calcStreak()} dias</span>
        <span class="psb-label">Streak atual 🔥</span>
      </div>
    `;
  }

  function updateWeight() {
    const val = parseFloat(document.getElementById('new-weight').value);
    if (!val || val < 30 || val > 300) { toast('Peso inválido.'); return; }
    state.user.weight = val;
    state.user.imc    = val / ((state.user.height / 100) ** 2);
    state.user.fatPct = estimateFatPct(state.user.imc, state.user.age, state.user.gender);
    if (!state.user.weightHistory) state.user.weightHistory = [];
    state.user.weightHistory.push({ date: today(), value: val });
    save();
    renderProfile();
    toast('✅ Peso atualizado!');
  }

  function resetApp() {
    if (confirm('⚠️ Isso apagará TODOS os seus dados. Tem certeza?')) {
      if (confirm('Última confirmação: resetar o aplicativo?')) {
        localStorage.removeItem('fitpro_state');
        location.reload();
      }
    }
  }

  /* ─── TIMER ─── */
  const Timer = (() => {
    let interval   = null;
    let seconds    = 90;
    let running    = false;
    let mode       = 'rest';
    let globalInt  = null;
    let globalSecs = 0;

    const display = () => {
      const el = document.getElementById('timer-display');
      if (el) el.textContent = fmt(seconds);
    };

    const fmt = (s) => {
      const m = Math.floor(Math.abs(s) / 60);
      const r = Math.abs(s) % 60;
      return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
    };

    function setMode(m) {
      mode = m;
      stop();
      document.querySelectorAll('.tmode-btn').forEach(b => b.classList.remove('active'));
      document.querySelector(`.tmode-btn[onclick*="${m}"]`)?.classList.add('active');
      const label = document.getElementById('timer-label');
      const defaults = { rest: 90, tabata: 20, emom: 60, hiit: 30 };
      const labels   = { rest: 'Descanso', tabata: 'Tabata (Esforço 20s/Descanso 10s)', emom: 'EMOM — cada minuto', hiit: 'HIIT — Esforço' };
      seconds = defaults[m] || 90;
      if (label) label.textContent = labels[m] || m;
      display();
    }

    function toggle() {
      if (running) { stop(); } else { start(); }
    }

    function start() {
      if (running) return;
      running = true;
      const btn = document.getElementById('timer-main-btn');
      if (btn) btn.textContent = '⏸ Pausar';
      interval = setInterval(() => {
        seconds--;
        display();
        if (seconds <= 0) {
          stop();
          playBeep();
          if (mode === 'tabata') { seconds = 10; document.getElementById('timer-label').textContent = 'Tabata — Descanso 10s'; start(); }
        }
      }, 1000);
    }

    function stop() {
      running = false;
      clearInterval(interval);
      interval = null;
      const btn = document.getElementById('timer-main-btn');
      if (btn) btn.textContent = '▶ Iniciar';
    }

    function reset() {
      stop();
      const defaults = { rest: 90, tabata: 20, emom: 60, hiit: 30 };
      seconds = defaults[mode] || 90;
      display();
    }

    function add(s)      { seconds += s; display(); }
    function subtract(s) { seconds = Math.max(0, seconds - s); display(); }

    function startRest() {
      stop();
      setMode('rest');
      start();
    }

    function startGlobal() {
      globalSecs = 0;
      clearInterval(globalInt);
      globalInt = setInterval(() => {
        globalSecs++;
        const el = document.getElementById('wk-global-timer');
        if (el) el.textContent = fmt(globalSecs);
      }, 1000);
    }

    function playBeep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } catch(e) {}
    }

    return { toggle, start, stop, reset, add, subtract, setMode, startRest, startGlobal };
  })();

  /* ─── UTILITÁRIOS ─── */
  function getExercise(id) { return DB.exercises.find(e => e.id === id) || null; }

  function applyTheme(goal) {
    document.body.classList.remove('theme-hypertrophy','theme-weightloss','theme-soccer','theme-sports');
    const map = { hypertrophy: 'theme-hypertrophy', weightloss: 'theme-weightloss', soccer: 'theme-soccer', sports: 'theme-sports' };
    if (map[goal]) document.body.classList.add(map[goal]);
  }

  function imcClass(imc) {
    if (imc < 18.5) return { label: 'Abaixo do peso', color: '#3b82f6' };
    if (imc < 25)   return { label: 'Peso normal',    color: '#22c55e' };
    if (imc < 30)   return { label: 'Sobrepeso',      color: '#f59e0b' };
    if (imc < 35)   return { label: 'Obesidade I',    color: '#f97316' };
    return                  { label: 'Obesidade II+', color: '#ef4444' };
  }

  function imcPosition(imc) {
    // Mapeia IMC 15-40 para 0-100%
    return Math.min(100, Math.max(0, ((imc - 15) / 25) * 100));
  }

  function calcStreak() {
    if (!state.diary.length) return 0;
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 60; i++) {
      const iso = new Date(d.getTime() - i * 86400000).toISOString().split('T')[0];
      if (state.diary.some(e => e.date.startsWith(iso))) { streak++; }
      else if (i > 0) break;
    }
    return streak;
  }

  function dayOfWeek() {
    const map = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    return map[new Date().getDay()];
  }

  function today() { return new Date().toISOString().split('T')[0]; }

  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(Math.round(n));
  }

  function formatDate(d) {
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  function levelLabel(l) {
    return { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' }[l] || l;
  }

  function rpeToColor(rpe) {
    if (!rpe) return '#6b7280';
    if (rpe <= 3) return '#22c55e';
    if (rpe <= 6) return '#f59e0b';
    if (rpe <= 8) return '#f97316';
    return '#ef4444';
  }

  function rpeLabel(rpe) {
    const map = { 1:'Muito fácil', 3:'Fácil', 5:'Moderado', 7:'Difícil', 9:'Muito difícil', 10:'Exaustão total' };
    return map[rpe] || `Intensidade ${rpe}`;
  }

  function getLevel(xp) {
    return DB.levels.find(l => xp >= l.min && xp <= l.max) || DB.levels[0];
  }

  function goalCardBg(goal) {
    const map = {
      hypertrophy: 'linear-gradient(135deg, rgba(127,29,29,.4), var(--card))',
      weightloss:  'linear-gradient(135deg, rgba(124,45,18,.4), var(--card))',
      soccer:      'linear-gradient(135deg, rgba(20,83,45,.4), var(--card))',
      sports:      'linear-gradient(135deg, rgba(30,58,95,.4), var(--card))',
    };
    return map[goal] || 'var(--card)';
  }

  function estimateFatPct(imc, age, gender) {
    const s = gender === 'M' ? 1 : 0;
    return Math.max(3, (1.20 * imc) + (0.23 * age) - (10.8 * s) - 5.4);
  }

  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 3500);
  }

  /* ─── INIT ─── */
  function init() {
    // Renderiza PAR-Q
    renderParq();

    // Tenta restaurar sessão
    if (load() && state.user?.goal) {
      applyTheme(state.user.goal);
    }
  }

  // Bootstrap
  document.addEventListener('DOMContentLoaded', init);

  /* ─── API PÚBLICA ─── */
  return {
    goTo, navTo, loadExisting,
    answerParq, submitParq,
    selectOption, toggleDay, submitRegister,
    selectGoal, regeneratePlan,
    startWorkout, nextExercise, prevExercise, exitWorkout,
    toggleSetDone, setRpe, finishWorkout,
    filterLibrary, setLibFilter,
    openExerciseModal, closeModal, openVideo,
    recalcTdee, updateWeight, resetApp,
    Timer,
  };

})();
