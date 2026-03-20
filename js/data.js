/* ═══════════════════════════════════════════════
   FITPRO — BASE DE DADOS DE EXERCÍCIOS
   ═══════════════════════════════════════════════ */

const DB = {

  /* ── PAR-Q ── */
  parqQuestions: [
    { id: 'q1', text: 'Um médico já disse que você tem algum problema no coração e que só deveria fazer atividade física sob supervisão médica?' },
    { id: 'q2', text: 'Você sente dor no peito quando faz atividade física?' },
    { id: 'q3', text: 'No último mês, você sentiu dor no peito sem estar fazendo atividade física?' },
    { id: 'q4', text: 'Você perde o equilíbrio por causa de tontura ou já perdeu a consciência alguma vez?' },
    { id: 'q5', text: 'Você tem algum problema ósseo ou muscular que poderia ser agravado com a prática de atividade física?' },
    { id: 'q6', text: 'Algum médico já receitou medicamento para pressão arterial ou problema no coração?' },
    { id: 'q7', text: 'Você tem mais de 45 anos e não está acostumado(a) a fazer atividade física intensa?' },
  ],

  /* ── EXERCÍCIOS ── */
  exercises: [

    /* ─────────── PEITO ─────────── */
    {
      id: 'bench_press', name: 'Supino Reto', emoji: '🏋️',
      muscle: 'Peito', muscleGroup: 'chest', secondary: 'Tríceps, Ombros Anteriores',
      equipment: ['gym', 'dumbbells'], level: 'intermediate',
      sets: '3-5', reps: '8-12', rest: '90s',
      execution: 'Deite no banco com os pés no chão. Pegue a barra com pegada levemente mais larga que os ombros. Retraia as omoplatas e mantenha o arco lombar natural. Desça a barra de forma controlada até tocar levemente o peito. Empurre explosivamente até a extensão completa dos cotovelos.',
      tips: 'Expire na subida. Não deixe os cotovelos flarirem demais. Mantenha os pés firmes no chão.',
      safety: 'Evite com lesão no ombro ou manguito rotador. Use spotter ao usar cargas elevadas.',
      variations: 'Supino Inclinado (ênfase na parte superior do peito), Supino Declinado (parte inferior), Crucifixo (isolamento).',
      calories: 6, goals: ['hypertrophy'], tags: ['força', 'composto']
    },
    {
      id: 'incline_bench', name: 'Supino Inclinado', emoji: '📐',
      muscle: 'Peito Superior', muscleGroup: 'chest', secondary: 'Ombros Anteriores, Tríceps',
      equipment: ['gym', 'dumbbells'], level: 'intermediate',
      sets: '3-4', reps: '10-15', rest: '90s',
      execution: 'Incline o banco entre 30-45 graus. Execute o supino com movimento idêntico ao reto, porém com ênfase no feixe clavicular do peitoral. Cotovelos em 45-75 graus em relação ao tronco.',
      tips: 'Quanto maior a inclinação, mais ombro é recrutado. 30-45° é o ideal para peito superior.',
      safety: 'Não ultrapasse 60° de inclinação para não perder ênfase no peito.',
      variations: 'Com halteres para maior amplitude de movimento.',
      calories: 5, goals: ['hypertrophy'], tags: ['força', 'composto']
    },
    {
      id: 'flye', name: 'Crucifixo com Halteres', emoji: '🦅',
      muscle: 'Peito', muscleGroup: 'chest', secondary: 'Bíceps Curto',
      equipment: ['gym', 'dumbbells'], level: 'beginner',
      sets: '3-4', reps: '12-15', rest: '60s',
      execution: 'Deite no banco com halteres acima do peito. Braços levemente flexionados. Abra os braços em arco amplo até sentir o alongamento do peito. Retorne à posição inicial contraindo o peitoral.',
      tips: 'Mantenha a leve flexão no cotovelo durante todo o movimento. Pense em "abraçar uma árvore".',
      safety: 'Não desça demais para evitar lesão no ombro. Dor aguda = pare imediatamente.',
      variations: 'Peck deck, Crossover com cabos.',
      calories: 4, goals: ['hypertrophy'], tags: ['isolamento', 'amplitude']
    },
    {
      id: 'pushup', name: 'Flexão de Braço', emoji: '💪',
      muscle: 'Peito', muscleGroup: 'chest', secondary: 'Tríceps, Core',
      equipment: ['bodyweight', 'outdoor'], level: 'beginner',
      sets: '3-4', reps: '10-20', rest: '60s',
      execution: 'Posição de prancha com mãos ligeiramente mais largas que os ombros. Desça o corpo mantendo o alinhamento da cabeça ao calcanhar. Peito toca o chão ou fica a 2cm. Empurre de volta à posição inicial.',
      tips: 'Core contraído durante todo o movimento. Olhe para o chão, não para frente.',
      safety: 'Iniciantes podem apoiar os joelhos no chão. Evite afundar os quadris.',
      variations: 'Flexão inclinada (mais fácil), declinada (mais difícil), diamante (tríceps), archer (unilateral).',
      calories: 5, goals: ['hypertrophy', 'weightloss', 'soccer', 'sports'], tags: ['peso corporal', 'composto']
    },

    /* ─────────── COSTAS ─────────── */
    {
      id: 'bent_row', name: 'Remada Curvada', emoji: '🚣',
      muscle: 'Costas', muscleGroup: 'back', secondary: 'Bíceps, Deltóide Posterior',
      equipment: ['gym', 'dumbbells'], level: 'intermediate',
      sets: '3-5', reps: '8-12', rest: '90s',
      execution: 'Pés na largura dos ombros, joelhos ligeiramente flexionados. Incline o tronco a ~45°. Segure a barra com pegada pronada. Puxe a barra em direção ao abdômen retraindo as escápulas. Desça de forma controlada.',
      tips: 'Mantenha a coluna neutra. Não arredonde as costas. Iniciar o movimento com as escápulas, não com os braços.',
      safety: 'Lesões lombares: evite ou use versão unilateral com apoio.',
      variations: 'Remada Unilateral (haltere), Remada Serrote, Remada Sentado no Cabo.',
      calories: 7, goals: ['hypertrophy'], tags: ['força', 'composto']
    },
    {
      id: 'pulldown', name: 'Puxada Frontal', emoji: '⬇️',
      muscle: 'Latíssimo do Dorso', muscleGroup: 'back', secondary: 'Bíceps, Romboides',
      equipment: ['gym'], level: 'beginner',
      sets: '3-4', reps: '10-15', rest: '75s',
      execution: 'Sente-se na máquina com coxas presas sob o suporte. Pegue a barra com pegada mais larga que os ombros. Retraia as escápulas e puxe a barra até a frente do peito. Controle a subida.',
      tips: 'Não bata a barra no queixo. Cotovelos apontam para o chão na fase de contração.',
      safety: 'Não puxe atrás da nuca — sobrecarga cervical.',
      variations: 'Puxada Supinada (mais bíceps), Puxada Neutra, Remada Alta no Cabo.',
      calories: 5, goals: ['hypertrophy'], tags: ['força', 'isolamento']
    },
    {
      id: 'pullup', name: 'Barra Fixa', emoji: '🏗️',
      muscle: 'Latíssimo do Dorso', muscleGroup: 'back', secondary: 'Bíceps, Core',
      equipment: ['gym', 'outdoor', 'bodyweight'], level: 'advanced',
      sets: '3-5', reps: '5-12', rest: '90s',
      execution: 'Segure a barra com pegada pronada (largura dos ombros ou mais). Parta do braço estendido. Puxe até o queixo ultrapassar a barra retraindo as escápulas. Desça de forma controlada até extensão completa.',
      tips: 'Não balance o corpo. Engaje o core. Escápulas se movem antes dos braços.',
      safety: 'Iniciantes: use elástico de assistência ou a máquina gravitron.',
      variations: 'Supinada (Chin-up, mais bíceps), Neutra, Archer Pull-up.',
      calories: 8, goals: ['hypertrophy', 'sports', 'soccer'], tags: ['peso corporal', 'composto', 'força']
    },

    /* ─────────── OMBROS ─────────── */
    {
      id: 'overhead_press', name: 'Desenvolvimento Militar', emoji: '🪖',
      muscle: 'Deltóide', muscleGroup: 'shoulders', secondary: 'Tríceps, Trapézio',
      equipment: ['gym', 'dumbbells'], level: 'intermediate',
      sets: '3-5', reps: '8-12', rest: '90s',
      execution: 'Em pé ou sentado. Segure a barra ou halteres na altura dos ombros. Empurre para cima até a extensão dos cotovelos. Desça de forma controlada à posição inicial. Core contraído durante todo o movimento.',
      tips: 'Não arqueie excessivamente a lombar. Olhe para frente. Com halteres, permita rotação natural do punho.',
      safety: 'Lesão no ombro ou impingement: evite ou substitua por elevação frontal.',
      variations: 'Desenvolvimento com Halteres, Arnold Press, Push Press.',
      calories: 5, goals: ['hypertrophy', 'soccer'], tags: ['força', 'composto']
    },
    {
      id: 'lateral_raise', name: 'Elevação Lateral', emoji: '↔️',
      muscle: 'Deltóide Médio', muscleGroup: 'shoulders', secondary: 'Trapézio Superior',
      equipment: ['gym', 'dumbbells', 'resistance_bands'], level: 'beginner',
      sets: '3-4', reps: '15-20', rest: '60s',
      execution: 'Em pé, halteres ao lado do corpo. Eleve os braços lateralmente até a altura dos ombros com cotovelos levemente flexionados. O polegar fica levemente apontado para baixo na posição mais alta. Desça de forma controlada.',
      tips: 'Não balance o tronco. Use carga leve com execução perfeita. Desça mais lento que sobe.',
      safety: 'Dor no acrômio: reduza amplitude ou mude a angulação.',
      variations: 'No cabo (tensão constante), Inclinado (deltóide posterior), Máquina.',
      calories: 3, goals: ['hypertrophy'], tags: ['isolamento', 'definição']
    },
    {
      id: 'face_pull', name: 'Face Pull', emoji: '🎯',
      muscle: 'Deltóide Posterior', muscleGroup: 'shoulders', secondary: 'Manguito Rotador, Romboides',
      equipment: ['gym'], level: 'beginner',
      sets: '3-4', reps: '15-20', rest: '60s',
      execution: 'Na polia alta com corda, puxe em direção ao rosto com cotovelos altos. Separe as mãos na posição final. Retorne de forma controlada.',
      tips: 'Exercício preventivo excelente. Ajuda no equilíbrio dos ombros para quem faz muito supino.',
      safety: 'Seguro para a maioria. Reduza carga se sentir tensão cervical.',
      variations: 'Com elástico (versão para casa).',
      calories: 3, goals: ['hypertrophy', 'sports'], tags: ['saúde', 'prevenção']
    },

    /* ─────────── BRAÇOS ─────────── */
    {
      id: 'bicep_curl', name: 'Rosca Direta', emoji: '💪',
      muscle: 'Bíceps', muscleGroup: 'arms', secondary: 'Braquial, Braquiorradial',
      equipment: ['gym', 'dumbbells', 'resistance_bands'], level: 'beginner',
      sets: '3-4', reps: '10-15', rest: '60s',
      execution: 'Em pé, halteres ou barra na mão. Cotovelos fixos ao longo do tronco. Flexione até a contração máxima. Desça de forma completa e controlada.',
      tips: 'Não balance o tronco. Descida lenta (2-3 segundos) aumenta hipertrofia.',
      safety: 'Dor no cotovelo: verifique posição do punho. Não hiper-supine.',
      variations: 'Rosca Martelo (neutro), Rosca Concentrada, Rosca Spider, Rosca 21.',
      calories: 3, goals: ['hypertrophy'], tags: ['isolamento', 'braços']
    },
    {
      id: 'hammer_curl', name: 'Rosca Martelo', emoji: '🔨',
      muscle: 'Bíceps Braquial', muscleGroup: 'arms', secondary: 'Braquiorradial',
      equipment: ['gym', 'dumbbells'], level: 'beginner',
      sets: '3-4', reps: '12-15', rest: '60s',
      execution: 'Pegada neutra (palmas voltadas entre si). Flexione de forma alternada ou simultânea. Movimento idêntico à rosca direta mas com pegada neutra.',
      tips: 'Excelente para espessura do braço. Inclui mais braquiorradial que a rosca direta.',
      safety: 'Muito seguro. Menor estresse no cotovelo que a rosca supinada.',
      variations: 'Cross Body Hammer Curl, Cabo Neutro.',
      calories: 3, goals: ['hypertrophy'], tags: ['isolamento', 'braços']
    },
    {
      id: 'tricep_pushdown', name: 'Tríceps Corda', emoji: '🔽',
      muscle: 'Tríceps', muscleGroup: 'arms', secondary: 'Antebraço',
      equipment: ['gym'], level: 'beginner',
      sets: '3-4', reps: '12-15', rest: '60s',
      execution: 'Na polia alta com corda. Cotovelos fixos ao lado do tronco. Estenda os cotovelos para baixo abrindo levemente a corda no final. Retorne de forma controlada.',
      tips: 'Não mova os ombros. Cotovelos fixos é fundamental para isolamento correto.',
      safety: 'Exercício seguro. Reduza carga se sentir dor no cotovelo.',
      variations: 'Tríceps Barra (mais cabeça longa), Tríceps Testa, Mergulho nas Paralelas.',
      calories: 3, goals: ['hypertrophy'], tags: ['isolamento', 'braços']
    },
    {
      id: 'skull_crusher', name: 'Tríceps Testa', emoji: '💀',
      muscle: 'Tríceps', muscleGroup: 'arms', secondary: 'Antebraço',
      equipment: ['gym', 'dumbbells'], level: 'intermediate',
      sets: '3-4', reps: '10-15', rest: '75s',
      execution: 'Deitado, barra/halteres acima do peito com cotovelos estendidos. Flexione os cotovelos trazendo a barra em direção à testa ou acima da cabeça. Estenda de volta à posição inicial.',
      tips: 'Mantém cotovelos apontados para o teto. Não alargue os cotovelos.',
      safety: 'Tome cuidado com a carga para não acertar a cabeça. Use barra EZ para menos estresse.',
      variations: 'Tríceps Francês, Extensão sobre a Cabeça.',
      calories: 3, goals: ['hypertrophy'], tags: ['isolamento', 'braços']
    },

    /* ─────────── PERNAS ─────────── */
    {
      id: 'squat', name: 'Agachamento Livre', emoji: '🏋️',
      muscle: 'Quadríceps', muscleGroup: 'legs', secondary: 'Glúteos, Isquiotibiais, Core',
      equipment: ['gym', 'bodyweight'], level: 'intermediate',
      sets: '4-5', reps: '8-15', rest: '120s',
      execution: 'Barra sobre os trapézios. Pés na largura dos ombros, pontas levemente para fora. Desça como se fosse sentar mantendo joelhos sobre os pés. Desça até a coxa paralela ao chão ou abaixo. Suba explosivamente.',
      tips: 'Peito erguido, olhar neutro. Joelhos não colapsam para dentro. Respiração: inspire descendo, expire subindo.',
      safety: 'Lordose exagerada e joelho em valgo são os erros mais comuns e perigosos.',
      variations: 'Agachamento Sumô, Agachamento Hack, Agachamento com Haltere, Búlgaro.',
      calories: 8, goals: ['hypertrophy', 'soccer', 'sports'], tags: ['força', 'composto', 'funcional']
    },
    {
      id: 'leg_press', name: 'Leg Press', emoji: '🦵',
      muscle: 'Quadríceps', muscleGroup: 'legs', secondary: 'Glúteos, Isquiotibiais',
      equipment: ['gym'], level: 'beginner',
      sets: '3-5', reps: '10-20', rest: '90s',
      execution: 'Sente-se na máquina com pés na plataforma na largura dos ombros. Desça a plataforma até os joelhos formarem 90°. Empurre de volta sem travar os joelhos no final.',
      tips: 'Mais ênfase no glúteo: pés altos na plataforma. Mais ênfase no quadríceps: pés baixos.',
      safety: 'Nunca trave os joelhos na extensão. Não deixe os joelhos colapsarem.',
      variations: 'Leg Press 45°, Hack Squat na Máquina.',
      calories: 6, goals: ['hypertrophy'], tags: ['força', 'máquina']
    },
    {
      id: 'romanian_dl', name: 'Levantamento Terra Romeno', emoji: '🏋️',
      muscle: 'Isquiotibiais', muscleGroup: 'legs', secondary: 'Glúteos, Lombar',
      equipment: ['gym', 'dumbbells'], level: 'intermediate',
      sets: '3-4', reps: '10-15', rest: '90s',
      execution: 'Em pé com barra ou halteres à frente das coxas. Empurre os quadris para trás descendo a barra pelas pernas com joelhos levemente flexionados. Desça até sentir o alongamento dos isquiotibiais. Volte contraindo os glúteos.',
      tips: 'Costas retas é fundamental. A barra fica próxima às pernas o tempo todo.',
      safety: 'Lesão lombar: priorize a técnica. Reduza amplitude se necessário.',
      variations: 'Levantamento Terra Convencional, Stiff com uma perna.',
      calories: 7, goals: ['hypertrophy', 'soccer'], tags: ['força', 'composto', 'posterior']
    },
    {
      id: 'lunge', name: 'Afundo / Lunge', emoji: '🦵',
      muscle: 'Quadríceps', muscleGroup: 'legs', secondary: 'Glúteos, Isquiotibiais, Core',
      equipment: ['gym', 'dumbbells', 'bodyweight', 'outdoor'], level: 'beginner',
      sets: '3-4', reps: '12 cada', rest: '75s',
      execution: 'Em pé, dê um passo à frente e desça até o joelho traseiro quase tocar o chão. Joelho da frente não deve ultrapassar a ponta do pé. Empurre de volta à posição inicial.',
      tips: 'Tronco ereto. Passos largos para mais glúteo, curtos para mais quadríceps.',
      safety: 'Joelho instável: segure em suporte. Dor no joelho anterior: reduza amplitude.',
      variations: 'Afundo Búlgaro, Afundo com Passada, Step-up.',
      calories: 6, goals: ['hypertrophy', 'soccer', 'sports', 'weightloss'], tags: ['funcional', 'unilateral']
    },
    {
      id: 'leg_curl', name: 'Mesa Flexora', emoji: '🔄',
      muscle: 'Isquiotibiais', muscleGroup: 'legs', secondary: 'Gastrocnêmio',
      equipment: ['gym'], level: 'beginner',
      sets: '3-4', reps: '12-15', rest: '60s',
      execution: 'Deitado na máquina com calcanhar sob o apoio. Flexione os joelhos trazendo os calcanhar em direção ao glúteo. Retorne de forma lenta e controlada.',
      tips: 'Isometria no topo aumenta o estímulo. Descida em 3-4 segundos.',
      safety: 'Posição dos pés altera o músculo recrutado. Neutro = equilíbrio.',
      variations: 'Flexora em Pé (unilateral), Nordic Curl (peso corporal).',
      calories: 4, goals: ['hypertrophy'], tags: ['isolamento', 'máquina']
    },
    {
      id: 'calf_raise', name: 'Panturrilha em Pé', emoji: '👟',
      muscle: 'Gastrocnêmio', muscleGroup: 'legs', secondary: 'Sóleo',
      equipment: ['gym', 'bodyweight', 'dumbbells'], level: 'beginner',
      sets: '4-5', reps: '15-25', rest: '45s',
      execution: 'Em pé no bordo de uma plataforma, suba nas pontas dos pés o máximo possível. Desça controladamente abaixo do nível neutro para maximizar o alongamento.',
      tips: 'Panturrilha responde bem a alto volume. 3 segundos no topo, 3 na descida.',
      safety: 'Exercício muito seguro. Progresso pode ser lento — seja paciente.',
      variations: 'Sentado (ênfase no sóleo), Leg Press na Ponta dos Pés.',
      calories: 3, goals: ['hypertrophy', 'soccer'], tags: ['isolamento', 'volume']
    },
    {
      id: 'jump_squat', name: 'Agachamento Pliométrico', emoji: '⬆️',
      muscle: 'Quadríceps', muscleGroup: 'legs', secondary: 'Glúteos, Core',
      equipment: ['bodyweight', 'outdoor'], level: 'intermediate',
      sets: '3-5', reps: '12-15', rest: '60s',
      execution: 'Agachamento com salto explosivo. Parta do agachamento profundo, salte o mais alto possível, aterrisse com joelhos flexionados para absorver o impacto.',
      tips: 'Aterrissagem suave é essencial para proteger os joelhos. Qualidade sobre velocidade.',
      safety: 'Não indicado para quem tem lesão no joelho. Superfície amortecida recomendada.',
      variations: 'Box Jump, Salto Alternado (split jump).',
      calories: 10, goals: ['soccer', 'sports', 'weightloss'], tags: ['pliometria', 'explosivo', 'HIIT']
    },
    {
      id: 'box_jump', name: 'Salto na Caixa (Box Jump)', emoji: '📦',
      muscle: 'Quadríceps', muscleGroup: 'legs', secondary: 'Glúteos, Core, Tornozelo',
      equipment: ['gym', 'outdoor'], level: 'intermediate',
      sets: '3-5', reps: '8-10', rest: '90s',
      execution: 'Em frente a uma caixa resistente (40-60cm). Agache levemente, balance os braços e salte sobre a caixa. Aterrisse com ambos os pés simultaneamente, joelhos flexionados. Desça cuidadosamente.',
      tips: 'A caixa deve ser estável. Comece baixo e progrida. Foco na aterrissagem.',
      safety: 'Sem pular a caixa em caso de fadiga muscular elevada.',
      variations: 'Lateral Box Jump, Step-up Explosivo.',
      calories: 12, goals: ['soccer', 'sports'], tags: ['pliometria', 'explosivo', 'potência']
    },

    /* ─────────── CORE ─────────── */
    {
      id: 'plank', name: 'Prancha Isométrica', emoji: '🪵',
      muscle: 'Core', muscleGroup: 'core', secondary: 'Glúteos, Ombros',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'beginner',
      sets: '3-4', reps: '30-60s', rest: '45s',
      execution: 'Apoio nos antebraços e pontas dos pés. Corpo alinhado da cabeça ao calcanhar. Core contraído, quadris na linha do corpo. Respire de forma controlada.',
      tips: 'Qualidade maior que quantidade. Se perder o alinhamento, pare.',
      safety: 'Dor lombar intensa: não force. Reduza amplitude ou use versão nos joelhos.',
      variations: 'Prancha Lateral, Prancha com Elevação, RKC Plank, Hollow Body.',
      calories: 4, goals: ['hypertrophy', 'soccer', 'sports', 'weightloss'], tags: ['core', 'isometria']
    },
    {
      id: 'crunch', name: 'Abdominal Crunch', emoji: '🌀',
      muscle: 'Reto Abdominal', muscleGroup: 'core', secondary: 'Oblíquos',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'beginner',
      sets: '3-4', reps: '15-25', rest: '45s',
      execution: 'Deitado, joelhos flexionados, pés no chão. Mãos atrás da cabeça levemente. Contraia o abdômen elevando os ombros do chão. Não puxe o pescoço com as mãos.',
      tips: 'A lombar permanece no chão. Expire contraindo, inspire descendo.',
      safety: 'Cervicalgia: apoie levemente a cabeça. Não faça sit-up com flexão total da coluna.',
      variations: 'Crunch no Cabo, Crunch Reverso, Abdominal Oblíquo.',
      calories: 3, goals: ['hypertrophy', 'weightloss'], tags: ['core', 'isolamento']
    },
    {
      id: 'mountain_climber', name: 'Mountain Climber', emoji: '🧗',
      muscle: 'Core', muscleGroup: 'core', secondary: 'Ombros, Quadríceps',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'beginner',
      sets: '3-4', reps: '30-60s', rest: '45s',
      execution: 'Posição de prancha alta. Traga alternadamente os joelhos em direção ao peito de forma rápida e controlada. Mantenha o quadril estável.',
      tips: 'Quanto mais rápido, mais cardio. Quanto mais controlado, mais core.',
      safety: 'Quadris não devem subir e descer. Core contraído durante todo o movimento.',
      variations: 'Mountain Climber Cruzado (oblíquos), Slow Mountain Climber.',
      calories: 10, goals: ['weightloss', 'soccer', 'sports'], tags: ['HIIT', 'cardio', 'core']
    },
    {
      id: 'ab_wheel', name: 'Roda Abdominal', emoji: '⚙️',
      muscle: 'Core', muscleGroup: 'core', secondary: 'Ombros, Latíssimo',
      equipment: ['gym', 'dumbbells'], level: 'advanced',
      sets: '3-4', reps: '8-15', rest: '60s',
      execution: 'Ajoelhado com a roda à sua frente. Role para frente mantendo o core contraído e a coluna neutra. Volte puxando com o core e as costas, não com os braços.',
      tips: 'Um dos melhores exercícios para core funcional. Progrida gradualmente.',
      safety: 'Não permita que a lombar arquee na extensão. Iniciante: comece com amplitude pequena.',
      variations: 'Ab Wheel em Pé (extremamente avançado).',
      calories: 5, goals: ['hypertrophy', 'sports'], tags: ['core', 'avançado', 'funcional']
    },
    {
      id: 'russian_twist', name: 'Russian Twist', emoji: '🌀',
      muscle: 'Oblíquos', muscleGroup: 'core', secondary: 'Reto Abdominal',
      equipment: ['bodyweight', 'gym'], level: 'beginner',
      sets: '3-4', reps: '20-30', rest: '45s',
      execution: 'Sentado com pés levantados, tronco reclinado ~45°. Segure um peso ou entrelace os dedos. Gire o tronco de lado a lado tocando o chão alternadamente.',
      tips: 'A rotação vem da cintura, não dos braços. Pés suspensos aumentam a dificuldade.',
      safety: 'Hérnia de disco: evite rotações forçadas da coluna.',
      variations: 'Com medicine ball, Com haltere, V-Sit com Rotação.',
      calories: 4, goals: ['soccer', 'sports', 'weightloss'], tags: ['core', 'rotação', 'funcional']
    },

    /* ─────────── CARDIO / HIIT ─────────── */
    {
      id: 'burpee', name: 'Burpee', emoji: '⚡',
      muscle: 'Corpo Todo', muscleGroup: 'cardio', secondary: 'Cardiorrespiratório',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'intermediate',
      sets: '4-5', reps: '10-15', rest: '45-60s',
      execution: 'Em pé → abaixe para flexão → execute uma flexão → pule os pés para perto das mãos → salto explosivo com braços acima da cabeça. Repita sem parar.',
      tips: 'Manter ritmo constante é mais importante que velocidade máxima.',
      safety: 'Lesão no punho: apoie nos punhos fechados. Lesão no joelho: retire o salto final.',
      variations: 'Half Burpee (sem flexão), Burpee com Pull-up, Burpee com Salto na Caixa.',
      calories: 15, goals: ['weightloss', 'sports'], tags: ['HIIT', 'cardio', 'explosivo', 'peso corporal']
    },
    {
      id: 'jumping_jack', name: 'Jumping Jack', emoji: '🌟',
      muscle: 'Corpo Todo', muscleGroup: 'cardio', secondary: 'Cardiorrespiratório',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'beginner',
      sets: '3-4', reps: '30-60s', rest: '30s',
      execution: 'Em pé, braços ao lado. Salte abrindo pernas e erguendo os braços acima da cabeça simultaneamente. Salte novamente voltando à posição inicial.',
      tips: 'Excelente aquecimento. Mantenha o ritmo constante.',
      safety: 'Impacto moderado. Pessoas com problemas articulares podem fazer a versão sem salto.',
      variations: 'Jumping Jack Cruzado, Jumping Jack com Agachamento.',
      calories: 8, goals: ['weightloss', 'sports'], tags: ['cardio', 'aquecimento', 'iniciante']
    },
    {
      id: 'high_knees', name: 'Corrida com Joelho Alto', emoji: '🦵',
      muscle: 'Core', muscleGroup: 'cardio', secondary: 'Quadríceps, Cardiorrespiratório',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'beginner',
      sets: '3-4', reps: '30-45s', rest: '30s',
      execution: 'Corra no lugar elevando os joelhos até a altura dos quadris. Mova os braços em oposição às pernas. Mantenha o core ativo e o tronco ereto.',
      tips: 'Quanto maior a frequência, maior o impacto cardiorrespiratório.',
      safety: 'Exercício de baixo risco. Supervisão desnecessária para maioria.',
      variations: 'High Knees com Resistência (elástico), High Knees laterais.',
      calories: 10, goals: ['weightloss', 'soccer', 'sports'], tags: ['cardio', 'HIIT', 'velocidade']
    },
    {
      id: 'skip_rope', name: 'Pular Corda', emoji: '🪢',
      muscle: 'Panturrilha', muscleGroup: 'cardio', secondary: 'Ombros, Core, Cardiorrespiratório',
      equipment: ['outdoor', 'gym'], level: 'beginner',
      sets: '5-10', reps: '1-3 min', rest: '30-60s',
      execution: 'Segure a corda nos extremos. Gire pelos pulsos (não pelos ombros). Salte levemente nas pontas dos pés. Mantenha os cotovelos próximos ao corpo.',
      tips: 'Comece com 30s e progrida. Misture: pés juntos, alternado, double under.',
      safety: 'Impacto nas articulações moderado. Evite em piso de concreto.',
      variations: 'Double Under, Single Leg, Cross Arms.',
      calories: 12, goals: ['weightloss', 'soccer', 'sports'], tags: ['cardio', 'resistência', 'coordenação']
    },
    {
      id: 'sprint', name: 'Corrida Intervalada (HIIT)', emoji: '🏃',
      muscle: 'Corpo Todo', muscleGroup: 'cardio', secondary: 'Cardiorrespiratório',
      equipment: ['outdoor', 'gym'], level: 'intermediate',
      sets: '6-10', reps: '30s esforço / 90s recuperação', rest: '90s',
      execution: 'Aquecimento 5 min. Alterne sprints de 30s em máxima intensidade com 90s de caminhada ou trote. Repita 6-10 vezes. Desaquecimento 5 min.',
      tips: 'Intensidade do sprint: 85-95% da FC máxima. Escale gradualmente.',
      safety: 'Importante aquecer bem. Não fazer em solo irregular.',
      variations: 'Corrida em Rampa, Bicicleta HIIT, Remo Ergométrico HIIT.',
      calories: 14, goals: ['weightloss', 'soccer', 'sports'], tags: ['HIIT', 'cardio', 'velocidade']
    },

    /* ─────────── FUNCIONAL / FUTEBOL ─────────── */
    {
      id: 'agility_ladder', name: 'Escada de Agilidade', emoji: '🪜',
      muscle: 'Membros Inferiores', muscleGroup: 'functional', secondary: 'Core, Coordenação',
      equipment: ['outdoor', 'gym'], level: 'beginner',
      sets: '5-8', reps: '10-15m cada padrão', rest: '60s',
      execution: 'Execute padrões variados na escada: dois pés dentro e fora, um pé por espaço, Ickey Shuffle, In-In-Out-Out. Progrida a velocidade gradualmente.',
      tips: 'Foco na coordenação antes da velocidade. Braços em movimento aumentam eficiência.',
      safety: 'Exercício de baixo risco. Espaço adequado ao redor.',
      variations: 'Padrões laterais, Padrões diagonais, Combinações.',
      calories: 8, goals: ['soccer', 'sports'], tags: ['agilidade', 'coordenação', 'velocidade']
    },
    {
      id: 'cone_drill', name: 'Drill com Cones', emoji: '🔶',
      muscle: 'Membros Inferiores', muscleGroup: 'functional', secondary: 'Core, Reatividade',
      equipment: ['outdoor', 'gym'], level: 'beginner',
      sets: '4-6', reps: '30-45s cada', rest: '90s',
      execution: 'Posicione cones em L, T ou W. Execute deslocamentos explosivos entre eles com mudanças de direção rápidas. Toque em cada cone e mude de direção.',
      tips: 'Baixo centro de gravidade melhora agilidade. Pés nunca cruzados em linhas laterais.',
      safety: 'Solo não escorregadio. Calçado adequado.',
      variations: 'T-Drill, 5-10-5 Drill, Cone em Estrela.',
      calories: 10, goals: ['soccer', 'sports'], tags: ['agilidade', 'reatividade', 'velocidade']
    },
    {
      id: 'medicine_ball_throw', name: 'Arremesso com Medicine Ball', emoji: '⚽',
      muscle: 'Core', muscleGroup: 'functional', secondary: 'Ombros, Tronco',
      equipment: ['gym', 'outdoor'], level: 'intermediate',
      sets: '3-5', reps: '12', rest: '75s',
      execution: 'Arremesso frontal: segure a bola com ambas as mãos. Agache levemente e arremesse contra a parede ou chão explosivamente. Catch e repita. Arremesso rotacional: rotacione e lance de lado.',
      tips: 'Poder vem das pernas e do core, não dos braços.',
      safety: 'Bola adequada ao nível: 4-8kg para iniciantes.',
      variations: 'Slam Ball, Rotacional, Acima da Cabeça, Lateral.',
      calories: 8, goals: ['soccer', 'sports'], tags: ['potência', 'core', 'funcional']
    },
    {
      id: 'kettlebell_swing', name: 'Kettlebell Swing', emoji: '🔔',
      muscle: 'Glúteos', muscleGroup: 'functional', secondary: 'Isquiotibiais, Core, Ombros',
      equipment: ['gym', 'kettlebell'], level: 'intermediate',
      sets: '4-5', reps: '15-20', rest: '75s',
      execution: 'Pés mais largos que os ombros. Segure o kettlebell com ambas as mãos. Empurre os quadris para trás (hip hinge), balance para trás entre as pernas e impulsione explosivamente com os glúteos enviando o KB à altura dos ombros.',
      tips: 'É um exercício de quadril, não de ombros. A força vem dos glúteos.',
      safety: 'Não arredonde a coluna no hip hinge. Aprenda com instrução antes de aumentar a carga.',
      variations: 'Single Arm Swing, Double Swing, KB Snatch.',
      calories: 12, goals: ['sports', 'weightloss'], tags: ['potência', 'funcional', 'posterior']
    },
    {
      id: 'turkish_getup', name: 'Turkish Get-Up', emoji: '🧘',
      muscle: 'Core', muscleGroup: 'functional', secondary: 'Ombros, Quadríceps, Glúteos',
      equipment: ['gym', 'kettlebell', 'dumbbells'], level: 'advanced',
      sets: '3-4', reps: '3-5 cada lado', rest: '90s',
      execution: 'Deitado, kettlebell estendido acima de um ombro. Siga a sequência: rolar para o cotovelo → pressionar a mão → elevar o quadril → joelho abaixo → posição em fenda → ficar em pé. Repita na ordem inversa.',
      tips: 'Olhe sempre para o KB. Movimento lento e controlado.',
      safety: 'Aprenda sem carga antes de adicionar peso.',
      variations: 'Com haltere, Com sapato (para aprender a técnica).',
      calories: 7, goals: ['sports'], tags: ['funcional', 'avançado', 'mobilidade', 'core']
    },
    {
      id: 'step_up', name: 'Step Up', emoji: '📶',
      muscle: 'Quadríceps', muscleGroup: 'functional', secondary: 'Glúteos, Isquiotibiais, Equilíbrio',
      equipment: ['gym', 'outdoor', 'bodyweight'], level: 'beginner',
      sets: '3-4', reps: '12 cada perna', rest: '60s',
      execution: 'Em frente a um banco ou caixa (40-50cm). Suba com um pé, pressione completamente o calcâneo e erga o corpo. Desça de forma controlada.',
      tips: 'Não empurre com o pé traseiro. Todo o trabalho deve ser da perna que sobe.',
      safety: 'Superfície estável é essencial. Sem superfície escorregadia.',
      variations: 'Step Up com Halteres, Step Up Lateral, com Knee Drive.',
      calories: 5, goals: ['soccer', 'sports', 'weightloss'], tags: ['funcional', 'unilateral', 'equilíbrio']
    },
    {
      id: 'lateral_shuffle', name: 'Deslocamento Lateral', emoji: '↔️',
      muscle: 'Abdutores', muscleGroup: 'functional', secondary: 'Glúteos, Core',
      equipment: ['outdoor', 'gym', 'bodyweight'], level: 'beginner',
      sets: '4-6', reps: '10m cada direção', rest: '60s',
      execution: 'Posição atlética (joelhos flexionados, quadril baixo). Deslocamento lateral com passos rápidos sem cruzar os pés. Mantenha a postura baixa durante todo o movimento.',
      tips: 'Largura dos passos determina a dificuldade. Não deixe os pés se unirem.',
      safety: 'Solo não escorregadio. Calçado de boa sustentação lateral.',
      variations: 'Com Elástico (Sumo Walk), Com Bola, Defensivo no Basquete.',
      calories: 8, goals: ['soccer', 'sports'], tags: ['agilidade', 'defensivo', 'funcional']
    },
    {
      id: 'clap_pushup', name: 'Flexão com Palmas', emoji: '👏',
      muscle: 'Peito', muscleGroup: 'functional', secondary: 'Tríceps, Core',
      equipment: ['bodyweight', 'outdoor', 'gym'], level: 'advanced',
      sets: '3-4', reps: '6-12', rest: '90s',
      execution: 'Flexão convencional. Na subida, empurre explosivamente para se afastar do chão, bata palmas e retorne as mãos para absorver o impacto com cotovelos ligeiramente flexionados.',
      tips: 'A qualidade da aterrissagem protege os punhos. Superfície adequada.',
      safety: 'Não fazer com os punhos fracos ou lesionados.',
      variations: 'Flexão com Bate-mão no Peito, Archer Clap Push-up.',
      calories: 10, goals: ['sports', 'soccer'], tags: ['pliometria', 'explosivo', 'peso corporal']
    },
  ],

  /* ── PROGRAMAS DE TREINO ── */
  programs: {

    hypertrophy: {
      name: 'Hipertrofia Muscular',
      description: 'Protocolo científico de ganho de massa muscular',
      theme: 'hypertrophy',
      icon: '💪',
      color: '#ef4444',
      splits: {
        beginner: {
          type: 'Full Body',
          days: ['Seg', 'Qua', 'Sex'],
          sessions: [
            { label: 'Full Body A', type: 'A', exercises: ['squat','bench_press','bent_row','overhead_press','bicep_curl','tricep_pushdown','plank'] },
            { label: 'Full Body B', type: 'B', exercises: ['romanian_dl','incline_bench','pulldown','lateral_raise','hammer_curl','skull_crusher','crunch'] },
            { label: 'Full Body C', type: 'C', exercises: ['lunge','pushup','pullup','face_pull','bicep_curl','tricep_pushdown','russian_twist'] },
          ]
        },
        intermediate: {
          type: 'ABC Split',
          days: ['Seg','Ter','Qua','Sex','Sáb'],
          sessions: [
            { label: 'Peito + Tríceps', type: 'A', exercises: ['bench_press','incline_bench','flye','tricep_pushdown','skull_crusher','plank'] },
            { label: 'Costas + Bíceps', type: 'B', exercises: ['bent_row','pulldown','pullup','bicep_curl','hammer_curl','ab_wheel'] },
            { label: 'Pernas', type: 'C', exercises: ['squat','leg_press','romanian_dl','lunge','leg_curl','calf_raise'] },
            { label: 'Ombros + Core', type: 'D', exercises: ['overhead_press','lateral_raise','face_pull','russian_twist','plank','crunch'] },
            { label: 'Braços + Core', type: 'E', exercises: ['bicep_curl','hammer_curl','skull_crusher','tricep_pushdown','ab_wheel','mountain_climber'] },
          ]
        },
        advanced: {
          type: 'ABCDE Split',
          days: ['Seg','Ter','Qua','Qui','Sex','Sáb'],
          sessions: [
            { label: 'Peito', type: 'A', exercises: ['bench_press','incline_bench','flye','pushup','plank'] },
            { label: 'Costas', type: 'B', exercises: ['bent_row','pulldown','pullup','face_pull','ab_wheel'] },
            { label: 'Pernas Ant.', type: 'C', exercises: ['squat','leg_press','lunge','calf_raise','crunch'] },
            { label: 'Ombros', type: 'D', exercises: ['overhead_press','lateral_raise','face_pull','russian_twist','plank'] },
            { label: 'Pernas Post.', type: 'E', exercises: ['romanian_dl','leg_curl','jump_squat','calf_raise','ab_wheel'] },
            { label: 'Braços', type: 'F', exercises: ['bicep_curl','hammer_curl','skull_crusher','tricep_pushdown','mountain_climber'] },
          ]
        }
      }
    },

    weightloss: {
      name: 'Perda de Peso',
      description: 'Combinação HIIT + Musculação para máxima queima calórica',
      theme: 'weightloss',
      icon: '🔥',
      color: '#f97316',
      splits: {
        beginner: {
          type: 'Cardio + Força',
          days: ['Seg','Qua','Sex'],
          sessions: [
            { label: 'Cardio Iniciante', type: 'CARDIO', exercises: ['jumping_jack','high_knees','mountain_climber','burpee','plank','crunch'] },
            { label: 'Força Total', type: 'FORÇA', exercises: ['squat','pushup','lunge','plank','crunch','mountain_climber'] },
            { label: 'HIIT + Força', type: 'HIIT', exercises: ['burpee','jump_squat','mountain_climber','jumping_jack','high_knees','plank'] },
          ]
        },
        intermediate: {
          type: 'HIIT + Musculação',
          days: ['Seg','Ter','Qua','Qui','Sex','Sáb'],
          sessions: [
            { label: 'Musculação + HIIT', type: 'A', exercises: ['squat','bench_press','bent_row','burpee','mountain_climber','plank'] },
            { label: 'Cardio Moderado', type: 'CARDIO', exercises: ['sprint','skip_rope','jumping_jack','high_knees','mountain_climber','russian_twist'] },
            { label: 'Musculação + HIIT', type: 'B', exercises: ['romanian_dl','pulldown','overhead_press','jump_squat','burpee','crunch'] },
            { label: 'Cardio Moderado', type: 'CARDIO', exercises: ['sprint','skip_rope','jumping_jack','high_knees','burpee','plank'] },
            { label: 'Circuito Queima', type: 'C', exercises: ['burpee','jump_squat','mountain_climber','jumping_jack','skip_rope','ab_wheel'] },
            { label: 'Atividade Recreativa', type: 'RECREAÇÃO', exercises: ['skip_rope','jumping_jack','high_knees','lateral_shuffle','plank','crunch'] },
          ]
        },
        advanced: {
          type: 'HIIT Avançado',
          days: ['Seg','Ter','Qua','Qui','Sex','Sáb'],
          sessions: [
            { label: 'Musculação + HIIT Avançado', type: 'A', exercises: ['squat','bench_press','pullup','burpee','jump_squat','ab_wheel'] },
            { label: 'HIIT Puro', type: 'HIIT', exercises: ['sprint','burpee','mountain_climber','jump_squat','skip_rope','high_knees'] },
            { label: 'Musculação + HIIT Avançado', type: 'B', exercises: ['romanian_dl','bent_row','overhead_press','clap_pushup','jump_squat','plank'] },
            { label: 'HIIT Puro', type: 'HIIT', exercises: ['sprint','burpee','jumping_jack','mountain_climber','high_knees','russian_twist'] },
            { label: 'Circuito Metabólico', type: 'C', exercises: ['kettlebell_swing','burpee','box_jump','skip_rope','mountain_climber','crunch'] },
            { label: 'Atividade Recreativa', type: 'RECREAÇÃO', exercises: ['sprint','lateral_shuffle','agility_ladder','cone_drill','plank','crunch'] },
          ]
        }
      }
    },

    soccer: {
      name: 'Atleta de Futebol',
      description: 'Condicionamento físico específico para futebol',
      theme: 'soccer',
      icon: '⚽',
      color: '#22c55e',
      splits: {
        beginner: {
          type: 'Futebol Base',
          days: ['Seg','Qua','Sex'],
          sessions: [
            { label: 'Força + Potência', type: 'FORÇA', exercises: ['squat','lunge','jump_squat','pushup','plank','calf_raise'] },
            { label: 'Resistência + Cardio', type: 'RESIST.', exercises: ['sprint','high_knees','lateral_shuffle','skip_rope','mountain_climber','crunch'] },
            { label: 'Agilidade + Core', type: 'AGIL.', exercises: ['agility_ladder','cone_drill','lateral_shuffle','plank','russian_twist','crunch'] },
          ]
        },
        intermediate: {
          type: 'Periodização Futebol',
          days: ['Seg','Ter','Qua','Qui','Sex','Sáb'],
          sessions: [
            { label: 'Força Funcional', type: 'FORÇA', exercises: ['squat','romanian_dl','lunge','pushup','pullup','plank'] },
            { label: 'Velocidade + Agilidade', type: 'VEL.', exercises: ['sprint','agility_ladder','cone_drill','lateral_shuffle','jump_squat','high_knees'] },
            { label: 'Potência + Pliometria', type: 'POTÊNCIA', exercises: ['box_jump','jump_squat','clap_pushup','medicine_ball_throw','calf_raise','ab_wheel'] },
            { label: 'Resistência Aeróbica', type: 'RESIST.', exercises: ['sprint','skip_rope','high_knees','mountain_climber','lateral_shuffle','crunch'] },
            { label: 'Core + Estabilidade', type: 'CORE', exercises: ['plank','russian_twist','ab_wheel','crunch','mountain_climber','step_up'] },
            { label: 'Regenerativo / Técnico', type: 'RECUP.', exercises: ['lateral_shuffle','agility_ladder','step_up','calf_raise','crunch','plank'] },
          ]
        },
        advanced: {
          type: 'Alta Performance',
          days: ['Seg','Ter','Qua','Qui','Sex','Sáb'],
          sessions: [
            { label: 'Força Máxima', type: 'FORÇA', exercises: ['squat','romanian_dl','pullup','bent_row','overhead_press','ab_wheel'] },
            { label: 'Sprint + SAQ', type: 'SAQ', exercises: ['sprint','agility_ladder','cone_drill','lateral_shuffle','high_knees','jump_squat'] },
            { label: 'Potência Explosiva', type: 'POTÊNCIA', exercises: ['box_jump','jump_squat','clap_pushup','kettlebell_swing','medicine_ball_throw','sprint'] },
            { label: 'Resistência Anaeróbica', type: 'ANAER.', exercises: ['burpee','sprint','high_knees','mountain_climber','lateral_shuffle','skip_rope'] },
            { label: 'Core + Prevenção', type: 'CORE', exercises: ['plank','russian_twist','ab_wheel','face_pull','step_up','calf_raise'] },
            { label: 'Regenerativo', type: 'RECUP.', exercises: ['lateral_shuffle','agility_ladder','step_up','calf_raise','crunch','plank'] },
          ]
        }
      }
    },

    sports: {
      name: 'Esportes Variados',
      description: 'Treinamento funcional para performance multi-esportiva',
      theme: 'sports',
      icon: '🏃',
      color: '#3b82f6',
      splits: {
        beginner: {
          type: 'Funcional Base',
          days: ['Seg','Qua','Sex'],
          sessions: [
            { label: 'Circuito Funcional A', type: 'A', exercises: ['squat','pushup','lunge','plank','jumping_jack','crunch'] },
            { label: 'Cardio + Core', type: 'B', exercises: ['high_knees','mountain_climber','skip_rope','russian_twist','step_up','plank'] },
            { label: 'Circuito Funcional B', type: 'C', exercises: ['burpee','jump_squat','lateral_shuffle','ab_wheel','step_up','crunch'] },
          ]
        },
        intermediate: {
          type: 'Circuitos Funcionais',
          days: ['Seg','Ter','Qua','Qui','Sex'],
          sessions: [
            { label: 'Potência + Força', type: 'A', exercises: ['squat','pullup','overhead_press','box_jump','medicine_ball_throw','ab_wheel'] },
            { label: 'Agilidade + Velocidade', type: 'B', exercises: ['agility_ladder','cone_drill','sprint','lateral_shuffle','high_knees','crunch'] },
            { label: 'Circuito Metabólico', type: 'C', exercises: ['burpee','kettlebell_swing','jump_squat','mountain_climber','skip_rope','plank'] },
            { label: 'Força + Mobilidade', type: 'D', exercises: ['romanian_dl','bent_row','lunge','face_pull','step_up','russian_twist'] },
            { label: 'Core + Pliometria', type: 'E', exercises: ['clap_pushup','box_jump','ab_wheel','plank','lateral_shuffle','crunch'] },
          ]
        },
        advanced: {
          type: 'Performance Avançada',
          days: ['Seg','Ter','Qua','Qui','Sex','Sáb'],
          sessions: [
            { label: 'Força Explosiva', type: 'A', exercises: ['squat','pullup','kettlebell_swing','box_jump','medicine_ball_throw','ab_wheel'] },
            { label: 'SAQ Avançado', type: 'B', exercises: ['sprint','agility_ladder','cone_drill','lateral_shuffle','jump_squat','high_knees'] },
            { label: 'Circuito Máximo', type: 'C', exercises: ['burpee','clap_pushup','turkish_getup','kettlebell_swing','skip_rope','mountain_climber'] },
            { label: 'Força + Resistência', type: 'D', exercises: ['romanian_dl','bent_row','overhead_press','lunge','step_up','plank'] },
            { label: 'Pliometria Avançada', type: 'E', exercises: ['box_jump','clap_pushup','jump_squat','agility_ladder','sprint','ab_wheel'] },
            { label: 'Regenerativo', type: 'RECUP.', exercises: ['lateral_shuffle','step_up','face_pull','calf_raise','russian_twist','plank'] },
          ]
        }
      }
    }
  },

  /* ── CONQUISTAS ── */
  achievements: [
    { id: 'first_workout',   icon: '🚀', name: 'Primeiro Treino',      desc: 'Completou seu primeiro treino',         xp: 50,   threshold: 1,   type: 'workouts' },
    { id: 'week_streak',     icon: '🔥', name: 'Semana Completa',      desc: 'Treinou 7 dias seguidos',               xp: 150,  threshold: 7,   type: 'streak' },
    { id: 'ten_workouts',    icon: '💪', name: 'Dedicado',             desc: 'Completou 10 treinos',                  xp: 100,  threshold: 10,  type: 'workouts' },
    { id: 'month_warrior',   icon: '🗓️', name: 'Guerreiro do Mês',    desc: 'Completou 30 treinos',                  xp: 300,  threshold: 30,  type: 'workouts' },
    { id: 'early_bird',      icon: '🌅', name: 'Madrugador',           desc: 'Treinou antes das 8h',                  xp: 75,   threshold: 1,   type: 'early' },
    { id: 'heavy_lifter',    icon: '🏋️', name: 'Levantador de Peso',  desc: 'Acumulou 10.000 kg de volume',           xp: 200,  threshold: 10000, type: 'volume' },
    { id: 'calorie_burner',  icon: '🔥', name: 'Queima Calórica',      desc: 'Queimou 5.000 kcal no total',            xp: 200,  threshold: 5000, type: 'calories' },
    { id: 'consistency_pro', icon: '⭐', name: 'Consistência Pro',     desc: 'Treinou 4x por semana por 4 semanas',    xp: 400,  threshold: 16,  type: 'workouts' },
    { id: 'no_pain',         icon: '🧘', name: 'Sem Desculpas',        desc: 'Treinou mesmo sendo dia de descanso',    xp: 100,  threshold: 1,   type: 'bonus' },
    { id: 'night_owl',       icon: '🦉', name: 'Coruja Fitness',       desc: 'Treinou após as 21h',                    xp: 50,   threshold: 1,   type: 'late' },
  ],

  /* ── DICAS NUTRICIONAIS POR OBJETIVO ── */
  nutritionTips: {
    hypertrophy: [
      { title: 'Superávit Calórico', body: 'Consuma 200-400 kcal acima do TDEE para ganho muscular com menos gordura (lean bulk).' },
      { title: 'Proteína: 1,6–2,2 g/kg', body: 'Priorize proteínas completas: frango, ovo, peixe, carne vermelha magra e whey protein.' },
      { title: 'Carboidratos: 4–6 g/kg', body: 'Principal fonte de energia para treinos. Arroz, batata-doce, aveia, macarrão integral.' },
      { title: 'Janela Anabólica', body: 'Consuma proteína + carboidrato nas 2h após o treino para otimizar a síntese proteica.' },
    ],
    weightloss: [
      { title: 'Déficit Calórico Inteligente', body: 'Coma 300-500 kcal abaixo do TDEE. Déficits maiores causam perda muscular e efeito rebote.' },
      { title: 'Alta Proteína: 2,0–2,5 g/kg', body: 'Proteína preserva a massa muscular durante a restrição calórica e aumenta a saciedade.' },
      { title: 'Carboidratos Estratégicos', body: 'Concentre carboidratos ao redor dos treinos. Prefira de baixo índice glicêmico.' },
      { title: 'Gorduras Boas', body: 'Azeite, abacate, castanhas e peixes gordurosos: essenciais para hormônios e saciedade.' },
    ],
    soccer: [
      { title: 'Carboidratos: 5–8 g/kg', body: 'Futebol demanda alto glicogênio muscular. Priorize carbos 3-4h antes dos treinos/jogos.' },
      { title: 'Hidratação Esportiva', body: 'Pré-treino: 500ml. Durante: 200ml a cada 15-20 min. Pós: reponha com eletrólitos.' },
      { title: 'Recuperação Pós-Jogo', body: 'Janela crítica de 30-60 min: 1g carboidrato/kg + 0,3g proteína/kg para recuperar glicogênio.' },
      { title: 'Refeição Pré-Jogo', body: 'Carboidrato de baixo-médio IG + proteína magra + baixa gordura/fibra, 3-4h antes.' },
    ],
    sports: [
      { title: 'Nutrição Periodizada', body: 'Adapte as calorias e macros aos dias de treino (mais) e descanso (menos).' },
      { title: 'Anti-inflamatórios Naturais', body: 'Ômega-3, cúrcuma, gengibre e frutas vermelhas aceleram a recuperação e reduzem inflamação.' },
      { title: 'Suplementação Básica', body: 'Creatina 3-5g/dia: melhora força, potência e recuperação para qualquer esporte.' },
      { title: 'Timing de Macros', body: 'Proteína distribuída em 4-5 refeições (20-40g cada) maximiza síntese muscular durante o dia.' },
    ]
  },

  /* ── LEVELS E XP ── */
  levels: [
    { min: 0,    max: 199,   name: 'Iniciante',   badge: '🌱' },
    { min: 200,  max: 499,   name: 'Aprendiz',    badge: '⚡' },
    { min: 500,  max: 999,   name: 'Atleta',      badge: '💪' },
    { min: 1000, max: 1999,  name: 'Veterano',    badge: '🔥' },
    { min: 2000, max: 4999,  name: 'Elite',       badge: '🏆' },
    { min: 5000, max: Infinity, name: 'Lendário', badge: '👑' },
  ]
};
