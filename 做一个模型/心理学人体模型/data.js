// ============================================================
//  心理学人体模型 · 结构知识库（真实解剖版）
//  meshNames = 该结构对应 brain.glb 里的真实网格名（精确匹配）。
//  bodyOnly=true 的结构属全身范围，本"大脑视图"暂不显示，数据保留待全身版。
// ============================================================

export const STRUCTURES = [
  {
    id: "amygdala", name: "杏仁核", en: "Amygdaloid body", system: "limbic",
    subtitle: "情绪（尤其恐惧）的核心中枢", color: 0xff5a5a,
    meshNames: ["Amygdaloid body.l", "Amygdaloid body.r"],
    location: "颞叶内侧、海马前端，左右各一，属边缘系统。",
    functions: [
      "对威胁与情绪刺激快速评估，是恐惧与焦虑的核心。",
      "给记忆'贴情绪标签'，让强情绪事件记得更牢。",
      "调节攻击/愤怒，解读他人恐惧表情。"
    ],
    memory: "与海马协作：海马记'事情本身'，杏仁核加'情绪权重'，情绪越强记忆越深（闪光灯记忆）。",
    disorders: [
      "焦虑症/恐惧症：杏仁核过度激活，对无害刺激报警。",
      "PTSD：杏仁核高反应 + 前额叶抑制不足，闪回惊跳。",
      "抑郁症：对负面信息反应增强。",
      "精神病态/反社会人格：对恐惧痛苦线索反应低下。"
    ],
    experiments: [
      "Klüver-Bucy 综合征：切除猴颞叶（含杏仁核）后恐惧消失。",
      "LeDoux 恐惧条件反射：'丘脑→杏仁核'快速低通路，先反应后思考。",
      "S.M. 病例：杏仁核双侧受损者几乎不知恐惧。"
    ],
    treatment: [
      "暴露疗法：让前额叶重新学会抑制杏仁核警报（消退学习）。",
      "SSRI 抗抑郁/抗焦虑：调节5-羟色胺降低过度反应。",
      "正念：增强前额叶自上而下调控。"
    ]
  },
  {
    id: "hippocampus", name: "海马", en: "Hippocampus", system: "limbic",
    subtitle: "把'经历'变成'长期记忆'的枢纽", color: 0x5a9bff,
    meshNames: ["Hippocampus.l", "Hippocampus.r"],
    location: "颞叶内侧，形似海马，紧邻杏仁核，属边缘系统。",
    functions: [
      "把短时记忆转为长时记忆（记忆巩固）。",
      "空间导航与认知地图（'位置细胞'所在）。",
      "情境记忆：把事件与时间地点绑定。"
    ],
    memory: "记忆的'总编辑室'。受损后无法形成新长期记忆（顺行性遗忘），但旧记忆与技能仍在。",
    disorders: [
      "阿尔茨海默病：海马最早、最严重萎缩，'记不住新事'是首发症状。",
      "抑郁/长期压力：皮质醇偏高会损伤海马、使其缩小。",
      "PTSD：海马体积减小，情境记忆碎片化。"
    ],
    experiments: [
      "H.M. 病例：切除双侧海马后再也记不住新事，却能学会镜画——外显与内隐记忆分离。",
      "伦敦出租车司机：记路者后海马更大，证明神经可塑性。",
      "莫里斯水迷宫：经典空间记忆范式。"
    ],
    treatment: [
      "有氧运动：促进海马神经新生（BDNF 增加）。",
      "抗抑郁治疗可部分逆转压力性海马萎缩。",
      "记忆策略借助内隐系统代偿。"
    ]
  },
  {
    id: "pfc", name: "前额叶皮层", en: "Prefrontal Cortex", system: "cortex",
    subtitle: "理性、计划与自我控制的'CEO'", color: 0xffd24a,
    meshNames: [
      "Superior frontal gyrus.l", "Superior frontal gyrus.r",
      "Middle frontal gyrus.l", "Middle frontal gyrus.r",
      "Orbital gyri.l", "Orbital gyri.r",
      "Straight gyrus (Gyrus rectus).l", "Straight gyrus (Gyrus rectus).r",
      "Transverse frontopolar gyrus and sulcus*.l", "Transverse frontopolar gyrus and sulcus*.r"
    ],
    location: "额叶最前部，人类相对最发达的皮层区。",
    functions: [
      "执行功能：计划、决策、工作记忆、抑制冲动。",
      "自上而下调控情绪，给杏仁核'踩刹车'。",
      "参与人格、道德判断与社会行为。"
    ],
    memory: "工作记忆的核心座椅（背外侧前额叶），暂存并操作信息。",
    disorders: [
      "ADHD：执行功能与抑制控制不足。",
      "抑郁症：背外侧前额叶活动降低，反刍难止。",
      "精神分裂症：前额叶功能低下（低额叶症）。",
      "成瘾：对奖赏冲动的控制被削弱。"
    ],
    experiments: [
      "菲尼亚斯·盖奇（铁棒穿脑）：前额叶损伤后人格剧变。",
      "威斯康星卡片分类（WCST）：评估认知灵活性。",
      "Stroop 任务：测量抑制控制。",
      "米歇尔棉花糖实验：延迟满足与自我控制。"
    ],
    treatment: [
      "认知行为疗法（CBT）：重构对情绪与念头的加工。",
      "经颅磁刺激（rTMS）：刺激背外侧前额叶治难治性抑郁。",
      "正念与执行功能训练。"
    ]
  },
  {
    id: "hypothalamus", name: "下丘脑", en: "Hypothalamus", system: "limbic",
    subtitle: "身体的'恒温器'· HPA轴起点", color: 0xff9a3a,
    meshNames: ["Hypothalamus", "Mamillary body.l", "Mamillary body.r"],
    location: "丘脑下方、脑底部中央，紧邻垂体。",
    functions: [
      "维持内稳态：体温、饥饿、口渴、睡眠、性行为。",
      "连接神经系统与内分泌系统，指挥垂体分泌激素。",
      "启动应激反应，是 HPA 轴（下丘脑-垂体-肾上腺）第一站。"
    ],
    memory: "本身不存记忆，但通过应激激素影响海马与杏仁核的记忆加工。",
    disorders: [
      "抑郁症：HPA 轴过度活跃、皮质醇长期升高。",
      "进食障碍：下丘脑摄食调节紊乱。",
      "睡眠障碍：生物钟（视交叉上核）位于此。"
    ],
    experiments: [
      "塞里一般适应综合征：警觉→抵抗→衰竭，压力生理学奠基。",
      "外侧/腹内侧下丘脑损毁：一个不吃、一个暴食。",
      "坎农'战或逃'反应理论。"
    ],
    treatment: [
      "压力管理/放松训练降低 HPA 轴过度激活。",
      "规律作息、光照疗法调节生物钟（季节性抑郁）。"
    ]
  },
  {
    id: "striatum", name: "纹状体", en: "Striatum (Caudate·Putamen·Pallidum)", system: "deep",
    subtitle: "快感、动机、习惯与成瘾中心（含伏隔核）", color: 0xc06aff,
    meshNames: [
      "Caudate nucleus.l", "Caudate nucleus.r",
      "Putamen.l", "Putamen.r",
      "Globus pallidus.l", "Globus pallidus.r"
    ],
    location: "基底神经节，深埋于大脑半球内。腹侧部分即伏隔核（奖赏核心）。",
    functions: [
      "处理奖赏、快感与动机（腹侧纹状体/伏隔核）。",
      "习惯与程序性学习、动作发起（背侧纹状体）。",
      "接收腹侧被盖区多巴胺信号，驱动趋近行为。"
    ],
    memory: "通过奖赏强化塑造习惯记忆——'为什么会上瘾'的关键。",
    disorders: [
      "各类成瘾（物质/赌博/手机/短视频）：奖赏回路被劫持。",
      "抑郁症快感缺失：奖赏系统反应迟钝。",
      "帕金森病/亨廷顿病：基底神经节退化，运动障碍。",
      "强迫症：皮层-纹状体环路过度活动。"
    ],
    experiments: [
      "奥尔兹与米尔纳(1954)颅内自我刺激：大鼠不停按压'快乐中枢'甚至放弃进食。",
      "斯金纳操作条件反射：可变比率强化最易成瘾（老虎机、刷短视频）。",
      "Schultz 多巴胺'预测误差'：编码的是'超出预期的奖赏'。"
    ],
    treatment: [
      "行为替代/强化管理：用健康奖赏替换成瘾奖赏。",
      "动机访谈、CBT 治疗成瘾。",
      "纳曲酮阻断阿片-多巴胺奖赏以降低渴求。"
    ]
  },
  {
    id: "acc", name: "前扣带回", en: "Anterior Cingulate Cortex", system: "limbic",
    subtitle: "情绪与认知的'冲突监测器'", color: 0x4ad6c0,
    meshNames: ["Cingulate gyrus and sulcus (Middle anterior part).l", "Cingulate gyrus and sulcus (Middle anterior part).r"],
    location: "扣带回前部，胼胝体上方，连接边缘系统与前额叶。",
    functions: [
      "冲突监测与错误检测，发现'不对劲'并调动控制。",
      "疼痛的情绪成分（含社会排斥之痛）。",
      "情绪脑与理性脑之间的桥梁。"
    ],
    memory: "参与情绪调节相关的注意与监控，影响记忆优先级。",
    disorders: [
      "抑郁症：膝下前扣带回(Area 25)过度活跃，是深部脑刺激靶点。",
      "强迫症：前扣带-纹状体环路过度活动，'错误信号'关不掉。",
      "慢性疼痛与情绪障碍共病。"
    ],
    experiments: [
      "Eisenberger Cyberball 网络排斥：社会排斥激活前扣带，'心痛'与生理痛共享脑区。",
      "冲突任务中的 ERN（错误相关负波）源于前扣带。"
    ],
    treatment: [
      "深部脑刺激(DBS) Area 25 治难治性抑郁。",
      "CBT 与暴露反应预防(ERP)治强迫症。"
    ]
  },
  {
    id: "insula", name: "岛叶", en: "Insula", system: "cortex",
    subtitle: "内感受、厌恶与渴求的中枢", color: 0xff7fb0,
    meshNames: ["Insula (Subcentral gyrus and ant. and post. sulci*).l", "Insula (Subcentral gyrus and ant. and post. sulci*).r"],
    location: "藏在外侧裂深处，被额、顶、颞叶盖住。",
    functions: [
      "内感受(interoception)：感知心跳、饥饿、疼痛等身体内部状态。",
      "产生厌恶(disgust)情绪，参与共情。",
      "整合身体状态与情绪，与成瘾的'渴求'密切相关。"
    ],
    memory: "把身体感觉与情绪体验绑定，参与'躯体标记'式的直觉判断。",
    disorders: [
      "成瘾：岛叶损伤的吸烟者可自发戒烟——渴求的关键脑区。",
      "焦虑/惊恐障碍：对身体信号过度解读（如把心跳当心梗）。",
      "抑郁：内感受异常。"
    ],
    experiments: [
      "达马西奥'躯体标记假说'：身体信号参与决策。",
      "岛叶损伤与吸烟戒断研究(Naqvi 2007)。"
    ],
    treatment: [
      "内感受暴露：让惊恐患者习惯身体感觉。",
      "正念身体扫描训练。"
    ]
  },
  {
    id: "thalamus", name: "丘脑", en: "Thalamus", system: "deep",
    subtitle: "通往皮层的'感觉中转站'", color: 0x6ad0ff,
    meshNames: ["Thalamus.l", "Thalamus.r"],
    location: "脑中央成对的卵圆结构，几乎所有感觉信息进皮层前的中继站（嗅觉除外）。",
    functions: [
      "中继并筛选感觉信息送往皮层。",
      "调节觉醒、注意与意识水平。",
      "参与睡眠-觉醒节律。"
    ],
    memory: "特定核团（如前核）属边缘环路，参与记忆（受损可致遗忘）。",
    disorders: [
      "意识障碍/昏迷与丘脑-皮层环路受损相关。",
      "精神分裂症：丘脑对信息的门控异常。",
      "丘脑痛：损伤后的顽固性疼痛。"
    ],
    experiments: [
      "感觉门控(sensory gating)研究：丘脑过滤无关刺激。",
      "睡眠纺锤波起源于丘脑网状核。"
    ],
    treatment: [
      "针对丘脑-皮层环路的神经调控（研究中）。",
      "抗精神病药调节相关多巴胺通路。"
    ]
  },
  {
    id: "corpus_callosum", name: "胼胝体", en: "Corpus Callosum", system: "deep",
    subtitle: "连接左右脑的'高速公路'", color: 0xf0e68c,
    meshNames: ["Corpus callosum"],
    location: "两半球之间最大的白质纤维束，约2亿条神经纤维。",
    functions: [
      "在左右半球之间传递信息、协调两侧。",
      "让语言脑(左)与空间/情绪脑(右)协同工作。"
    ],
    memory: "使两半球共享记忆与经验；切断后两侧可各自独立学习。",
    disorders: [
      "裂脑：治疗顽固癫痫切断胼胝体后，左右脑'各行其是'。",
      "胼胝体发育不全与认知/社交障碍相关。"
    ],
    experiments: [
      "Sperry & Gazzaniga 裂脑研究(诺奖)：左视野物体右脑知道却说不出名（语言在左脑）——揭示大脑偏侧化。"
    ],
    treatment: [
      "胼胝体切开术是顽固癫痫的最后手段。",
      "康复训练促进两侧协调代偿。"
    ]
  },
  {
    id: "cerebellum", name: "小脑", en: "Cerebellum", system: "cortex",
    subtitle: "不只管运动，也管认知与情绪", color: 0x9acd6a,
    meshNames: [
      "Anterior quadrangular lobule.l", "Anterior quadrangular lobule.r",
      "Posterior quadrangular lobule.l", "Posterior quadrangular lobule.r",
      "Superior semilunar lobule.l", "Superior semilunar lobule.r",
      "Inferior semilunar lobule.l", "Inferior semilunar lobule.r",
      "Biventral lobule.l", "Biventral lobule.r",
      "Gracile lobule.l", "Gracile lobule.r",
      "Tonsil of cerebellum.l", "Tonsil of cerebellum.r",
      "Culmen", "Declive", "Uvula of vermis", "Pyramis of vermis"
    ],
    location: "脑后下方，'小小的脑'，含全脑一半以上的神经元。",
    functions: [
      "协调运动、维持平衡与姿势、让动作流畅精准。",
      "运动学习与时序（如乐器、运动技能）。",
      "参与认知、语言与情绪调节（新近认识）。"
    ],
    memory: "程序性/运动记忆与经典条件反射（如眨眼条件反射）的关键。",
    disorders: [
      "小脑认知情感综合征(CCAS)：损伤致执行、情绪调节障碍。",
      "自闭症、精神分裂症中可见小脑异常。",
      "共济失调：运动不协调。"
    ],
    experiments: [
      "眨眼条件反射：小脑是经典条件反射的存储部位。",
      "运动适应实验（棱镜适应）显示小脑的误差校正作用。"
    ],
    treatment: [
      "康复与运动训练。",
      "针对小脑的经颅刺激用于情绪/认知（研究中）。"
    ]
  },
  {
    id: "broca", name: "布洛卡区", en: "Broca's Area", system: "sensorimotor",
    subtitle: "语言'产出'中枢", color: 0xff8c42,
    meshNames: [
      "Opercular part of inferior frontal gyrus.l", "Opercular part of inferior frontal gyrus.r",
      "Triangular part of inferior frontal gyrus.l", "Triangular part of inferior frontal gyrus.r"
    ],
    location: "左额下回后部（多数人语言在左脑）。",
    functions: [
      "语言的产生与语法组织。",
      "参与言语计划与发音编程。"
    ],
    memory: "与语言性工作记忆、内部言语相关。",
    disorders: [
      "布洛卡失语（表达性失语）：能听懂，但说话费力、电报式、不流畅。",
      "口吃等言语流畅性问题的相关脑区。"
    ],
    experiments: [
      "布洛卡'Tan'病例(1861)：患者只会说'tan'，尸检发现左额下回受损——脑功能定位里程碑。"
    ],
    treatment: [
      "言语-语言治疗(SLT)。",
      "旋律语调疗法等康复手段。"
    ]
  },
  {
    id: "pituitary", name: "垂体", en: "Pituitary (Hypophysis)", system: "endocrine",
    subtitle: "内分泌'总指挥'· HPA轴第二站", color: 0xffb86b,
    meshNames: ["Adenohypophysis", "Neurohypophysis"],
    location: "下丘脑正下方，蝶鞍内，豌豆大小。",
    functions: [
      "受下丘脑指挥，分泌激素调控甲状腺、肾上腺、性腺。",
      "应激中分泌 ACTH，命令肾上腺释放皮质醇。",
      "分泌催产素、催乳素、生长激素等。"
    ],
    memory: "催产素影响信任、依恋与社会记忆；应激激素轴影响记忆巩固。",
    disorders: [
      "抑郁/焦虑：HPA 轴失调时 ACTH 分泌异常。",
      "催产素系统异常与孤独症社会障碍相关（研究中）。"
    ],
    experiments: [
      "地塞米松抑制试验(DST)：检测 HPA 轴负反馈，曾作抑郁生物标志。",
      "催产素鼻喷提升信任与共情的实验。"
    ],
    treatment: [
      "针对 HPA 轴的压力干预。",
      "催产素相关社会认知干预（研究阶段）。"
    ]
  },

  {
    id: "m1", name: "初级运动皮层", en: "Primary Motor Cortex (M1)", system: "sensorimotor",
    subtitle: "随意运动的发令区 · '运动小人'", color: 0xff6b6b,
    meshNames: ["Precentral_gyrus_l", "Precentral_gyrus_r"],
    location: "中央前回（中央沟前方），额叶后部。",
    functions: ["发出随意运动指令，控制对侧身体肌肉。", "身体各部位按'运动小人'(homunculus)比例映射，手与口面积最大。"],
    memory: "程序性动作的执行端；技能记忆的输出。",
    disorders: ["卒中/损伤致对侧偏瘫。", "帕金森、运动障碍时运动皮层输出受影响。"],
    experiments: ["彭菲尔德电刺激皮层绘出'运动小人'。", "经颅磁刺激(TMS)运动区可诱发肢体抽动，用于测皮层兴奋性。"],
    treatment: ["康复训练与运动再学习（神经可塑性）。", "镜像疗法、脑机接口辅助运动恢复。"]
  },
  {
    id: "s1", name: "初级躯体感觉皮层", en: "Primary Somatosensory Cortex (S1)", system: "sensorimotor",
    subtitle: "触觉温痛觉的接收区 · '感觉小人'", color: 0x5ac8fa,
    meshNames: ["Postcentral_gyrus_l", "Postcentral_gyrus_r"],
    location: "中央后回（中央沟后方），顶叶前部。",
    functions: ["接收对侧身体的触觉、压觉、温度、痛觉与本体感觉。", "身体按'感觉小人'比例映射，手指与嘴唇代表区最大。"],
    memory: "身体感觉的即时表征，参与'躯体标记'。",
    disorders: ["损伤致对侧感觉缺失或麻木。", "幻肢痛与皮层重组相关。"],
    experiments: ["彭菲尔德电刺激绘出'感觉小人'。", "两点辨别阈实验：手指分辨力最高，反映皮层代表区大小。"],
    treatment: ["感觉再训练。", "针对幻肢痛的镜像疗法。"]
  },
  {
    id: "v1", name: "初级视皮层 / 枕叶视区", en: "Primary Visual Cortex (V1) & Occipital", system: "sensorimotor",
    subtitle: "视觉信息进入皮层的第一站", color: 0x9b7bff,
    meshNames: ["Calcarine_sulcus_l","Calcarine_sulcus_r","Occipital_pole_l","Occipital_pole_r","Cuneus_l","Cuneus_r","Lingual_gyrus_l","Lingual_gyrus_r","Superior_occipital_gyri_l","Superior_occipital_gyri_r","Lateral_occipital_gyrus_Middle_occipital_gyrus_l","Lateral_occipital_gyrus_Middle_occipital_gyrus_r","Inferior_occipital_gyrus_and_sulcus_l","Inferior_occipital_gyrus_and_sulcus_r"],
    location: "枕叶，V1沿距状沟分布。",
    functions: ["处理视觉最基本特征：朝向、边缘、明暗、颜色、运动。", "分出两条通路：背侧'在哪里/怎么做'、腹侧'是什么'。"],
    memory: "视觉表象与心理旋转会激活视皮层。",
    disorders: ["损伤致对侧视野缺损(偏盲)。", "盲视：V1损伤者能'无意识'反应视觉刺激。", "视觉失认(腹侧通路受损)。"],
    experiments: ["休伯尔与威塞尔(诺奖)发现方位选择性细胞与视皮层柱状结构。", "关键期实验：幼年单眼剥夺致视皮层可塑性改变。"],
    treatment: ["视野康复训练。", "低视力辅助与代偿策略。"]
  },
  {
    id: "a1", name: "初级听皮层", en: "Primary Auditory Cortex (A1)", system: "sensorimotor",
    subtitle: "声音进入皮层的第一站", color: 0x4ecdc4,
    meshNames: ["Transverse_temporal_gyri_l","Transverse_temporal_gyri_r","Temporal_plane_l","Temporal_plane_r"],
    location: "颞横回(Heschl回)，颞上回内侧。",
    functions: ["按频率(音调)有序排列(音频拓扑)加工声音。", "参与语音、音乐与声源分析。"],
    memory: "听觉表象与'耳虫'现象涉及听皮层。",
    disorders: ["皮层性耳聋(双侧损伤)。", "幻听：精神分裂常见，与听皮层异常激活相关。", "耳鸣的中枢机制。"],
    experiments: ["音频拓扑图谱研究。", "失匹配负波(MMN)反映听觉自动辨别，用于意识与预测加工研究。"],
    treatment: ["人工耳蜗与听觉训练。", "针对幻听的抗精神病药与认知行为干预。"]
  },
  {
    id: "wernicke", name: "韦尼克区", en: "Wernicke's Area", system: "sensorimotor",
    subtitle: "语言'理解'中枢", color: 0xffa94d,
    meshNames: ["Superior_temporal_gyrus_Lateral_part_l","Superior_temporal_gyrus_Lateral_part_r","Superior_temporal_sulcus_l","Superior_temporal_sulcus_r"],
    location: "颞上回后部（多数人在左脑），邻近听皮层。",
    functions: ["理解口语与书面语言的意义。", "与布洛卡区经弓状束相连，构成语言网络。"],
    memory: "语义记忆的通达；颞上沟还参与社会认知(目光、生物运动)。",
    disorders: ["韦尼克失语(接受性失语)：说话流利但内容空洞、听不懂别人。", "传导性失语(弓状束损伤)：复述困难。"],
    experiments: ["韦尼克(1874)描述后颞叶损伤致理解障碍，与布洛卡区互补，确立语言双中枢模型。"],
    treatment: ["言语-语言治疗。", "结合手势、图片的多通道沟通训练。"]
  },
  {
    id: "parietal", name: "顶叶联合皮层", en: "Parietal Association Cortex", system: "sensorimotor",
    subtitle: "空间注意与感觉整合", color: 0x74c0fc,
    meshNames: ["Superior_parietal_lobule_l","Superior_parietal_lobule_r","Intraparietal_sulcus_l","Intraparietal_sulcus_r","Supramarginal_gyrus_l","Supramarginal_gyrus_r","Angular_gyrus_l","Angular_gyrus_r"],
    location: "顶叶后部，跨顶上小叶、顶内沟、缘上回、角回。",
    functions: ["整合多种感觉，构建空间与身体图式。", "引导注意、手眼协调、数量与工具使用。"],
    memory: "参与工作记忆的空间成分与注意导向的记忆提取。",
    disorders: ["半侧空间忽视(右顶叶损伤)：忽略左半世界。", "Gerstmann综合征(左角回)：失写、失算、手指失认、左右不分。", "失用症。"],
    experiments: ["空间忽视的线段等分/划消实验。", "顶叶注意网络的Posner线索范式研究。"],
    treatment: ["忽视的视觉扫描训练、棱镜适应。", "注意与空间认知康复。"]
  },
  {
    id: "visual_pathway", name: "视觉通路（视交叉·外侧膝状体）", en: "Visual Pathway", system: "deep",
    subtitle: "眼睛到视皮层的'线路'", color: 0xb2f2bb,
    meshNames: ["Optic_chiasm_l","Optic_chiasm_r","Optic_tract_l","Optic_tract_r","Lateral_geniculate_body_l","Lateral_geniculate_body_r"],
    location: "视神经→视交叉→视束→外侧膝状体(丘脑)→视放射→V1。",
    functions: ["把视网膜信号传到皮层；视交叉处鼻侧纤维交叉到对侧。", "外侧膝状体是丘脑视觉中继与门控站。"],
    memory: "视觉输入的最前端，决定'看得到'的基础。",
    disorders: ["不同部位损伤致特定视野缺损：视交叉受压(如垂体瘤)→双颞侧偏盲；视束/膝状体损伤→对侧同向偏盲。"],
    experiments: ["经典视野缺损定位法：由缺损形状反推损伤部位。", "外侧膝状体的层状结构(大细胞/小细胞层)研究。"],
    treatment: ["病因治疗(如切除压迫视交叉的肿瘤)。", "视野康复与辅助。"]
  },
  {
    id: "brainstem", name: "脑干（网状激活系统）", en: "Brainstem (Reticular Activating System)", system: "deep",
    subtitle: "觉醒、睡眠与生命中枢", color: 0xffd43b,
    meshNames: ["Midbrain_l","Midbrain_r","Pons_l","Pons_r","Medulla_oblongata_l"],
    location: "中脑+脑桥+延髓，连接大脑与脊髓。",
    functions: ["网状激活系统(RAS)调控觉醒、意识水平与睡眠-觉醒。", "控制呼吸、心跳、血压等生命体征。", "含多巴胺(VTA)、去甲肾上腺素(蓝斑)、5-羟色胺(中缝核)等关键递质核团来源。"],
    memory: "唤醒水平是注意与记忆编码的基础(耶克斯-多德森定律)。",
    disorders: ["上行网状系统受损致昏迷/意识障碍。", "蓝斑-去甲肾上腺素与焦虑、应激相关；中缝核-5HT与抑郁相关。", "REM睡眠障碍源于脑桥。"],
    experiments: ["Moruzzi & Magoun(1949)刺激网状结构唤醒动物，发现RAS。", "睡眠分期与脑干核团的关系研究。"],
    treatment: ["针对递质系统的药物(抗抑郁作用于5HT/NE来源核团)。", "意识障碍的促醒与生命支持。"]
  },

  // ===== 以下属全身内分泌，本大脑视图不显示，数据保留待全身版 =====
  {
    id: "adrenal", name: "肾上腺", en: "Adrenal Glands", system: "endocrine", bodyOnly: true, color: 0xffb03a,
    subtitle: "应激激素工厂 · HPA轴终点", meshNames: [],
    location: "左右肾脏上方各一，帽状。",
    functions: ["皮质分泌皮质醇（压力激素）维持长期应激。", "髓质分泌肾上腺素驱动即时'战或逃'。", "HPA 轴执行终端。"],
    memory: "适量应激激素增强情绪记忆；长期过量皮质醇损伤海马。",
    disorders: ["抑郁/慢性压力：皮质醇长期偏高。", "PTSD：应激激素调节异常。", "倦怠(burnout)。"],
    experiments: ["沙赫特-辛格情绪二因素：肾上腺素+情境解释共同决定情绪。", "冷压/TSST 社会应激测试诱发皮质醇。"],
    treatment: ["放松、正念、运动降低皮质醇。", "改善睡眠调节应激激素节律。"]
  },
  {
    id: "thyroid", name: "甲状腺", en: "Thyroid Gland", system: "endocrine", bodyOnly: true, color: 0x7ad67a,
    subtitle: "代谢油门 · 情绪的隐形推手", meshNames: [],
    location: "颈部前方、喉结下方，蝴蝶形。",
    functions: ["分泌甲状腺激素调节全身代谢与能量。", "影响心率、体温、体重与精神活力。"],
    memory: "激素不足致注意力、记忆与反应变慢（'脑雾'）。",
    disorders: ["甲减：常表现为抑郁、疲乏——易误诊为抑郁症。", "甲亢：焦虑、失眠、心悸——易误认为焦虑症。"],
    experiments: ["诊断抑郁/焦虑前需筛查甲状腺，排除躯体病因（鉴别诊断）。"],
    treatment: ["内科激素治疗，情绪症状常随之改善。", "提示身心共病、需同治。"]
  }
];

// 莫兰迪低饱和配色 + 解剖子区（region 用于信息卡标签；分组顺序见 STRUCTURE_TREE）
const META = {
  pfc:            { color: 0xC9B98A, region: "额叶" },
  broca:          { color: 0xC3A47E, region: "额叶" },
  m1:             { color: 0xBF8F88, region: "额叶" },
  s1:             { color: 0x92A6B2, region: "顶叶" },
  parietal:       { color: 0x9AAFC0, region: "顶叶" },
  a1:             { color: 0x93AB9F, region: "颞叶" },
  wernicke:       { color: 0xC7A87E, region: "颞叶" },
  v1:             { color: 0xA99CB6, region: "枕叶" },
  insula:         { color: 0xC59C90, region: "岛叶" },
  amygdala:       { color: 0xC08A82, region: "边缘系统" },
  hippocampus:    { color: 0x8FA6B8, region: "边缘系统" },
  acc:            { color: 0x8FB0A6, region: "边缘系统" },
  striatum:       { color: 0xA893A6, region: "基底神经节" },
  thalamus:       { color: 0x97A6C0, region: "间脑" },
  hypothalamus:   { color: 0xC49A7C, region: "间脑" },
  brainstem:      { color: 0xC4AC7E, region: "脑干" },
  cerebellum:     { color: 0x9DAF8E, region: "小脑" },
  corpus_callosum:{ color: 0x7FC4C9, region: "胼胝体（白质）" },   // 原色与周围白质太接近，选中后看不出亮
  visual_pathway: { color: 0xA7B396, region: "视觉通路" },
  pituitary:      { color: 0xCBA7AD, region: "内分泌腺体" },
  adrenal:        { color: 0xC7A77C, region: "内分泌腺体" },
  thyroid:        { color: 0x9DB295, region: "内分泌腺体" }
};
for (const s of STRUCTURES) { const m = META[s.id]; if (m) { s.color = m.color; s.region = m.region; } }

// ============ 数据驱动的左栏「按结构」目录（大类 → 子区 → 结构id）============
// 想调顺序/搬结构，改这里即可，无需动代码。
export const STRUCTURE_TREE = [
  { cat: "大脑皮层", groups: [
    { name: "额叶", ids: ["pfc", "broca", "m1"] },
    { name: "顶叶", ids: ["s1", "parietal"] },
    { name: "颞叶", ids: ["a1", "wernicke"] },
    { name: "枕叶", ids: ["v1"] },
    { name: "岛叶", ids: ["insula"] }
  ]},
  { cat: "皮层下系统与核团", groups: [
    { name: "边缘系统", ids: ["amygdala", "hippocampus", "acc"] },
    { name: "基底神经节", ids: ["striatum"] },
    { name: "间脑", ids: ["thalamus", "hypothalamus"] }
  ]},
  { cat: "脑干与小脑", groups: [
    { name: "脑干", ids: ["brainstem"] },
    { name: "小脑", ids: ["cerebellum"] }
  ]},
  { cat: "白质纤维束与通路", groups: [
    { name: "胼胝体", ids: ["corpus_callosum"] },
    { name: "视觉通路", ids: ["visual_pathway"] }
  ]},
  { cat: "内分泌腺体", groups: [
    { name: "垂体", ids: ["pituitary"] }
  ]}
];

// 按功能：点一个功能，相关脑区一起亮。points 为心理学知识点。
export const FUNCTIONS = [
  { id: "vision", name: "视觉", en: "Vision", members: ["visual_pathway", "v1"],
    brief: "光信息的传导与初级加工",
    detail: "眼→视交叉→外侧膝状体→初级视皮层(V1)；V1提取边缘、朝向等基本特征。",
    points: [
      "视觉通路：视交叉处鼻侧纤维交叉，不同部位损伤→不同视野缺损(如双颞侧偏盲)。",
      "特征觉察器(休伯尔&威塞尔，诺奖)；视皮层柱状结构。",
      "视觉双通路：腹侧'是什么'、背侧'在哪里/怎么做'。",
      "盲视：V1损伤者能'无意识'反应视觉刺激。",
      "知觉恒常性、格式塔组织原则、深度线索。"
    ] },
  { id: "hearing", name: "听觉", en: "Hearing", members: ["a1"],
    brief: "声音的皮层加工",
    detail: "耳蜗→内侧膝状体→初级听皮层(颞横回/Heschl回)，按频率有序排列(音频拓扑)。",
    points: [
      "音频拓扑：不同频率对应皮层不同位置。",
      "幻听：精神分裂常见，与听皮层异常激活相关。",
      "失匹配负波(MMN)反映听觉自动辨别。",
      "鸡尾酒会效应：听觉的选择性注意。"
    ] },
  { id: "somatosensory", name: "躯体感觉", en: "Somatosensation", members: ["s1"],
    brief: "触压、温痛与本体感觉",
    detail: "中央后回(S1)接收对侧身体感觉，按'感觉小人'比例映射。",
    points: [
      "感觉'小人'：手指、嘴唇代表区最大。",
      "两点辨别阈：手指分辨力最高。",
      "幻肢痛与皮层重组。",
      "疼痛的闸门控制理论(Melzack & Wall)。"
    ] },
  { id: "chemical", name: "嗅觉与味觉", en: "Smell & Taste", members: ["insula"],
    brief: "味觉(岛叶)与嗅觉",
    detail: "岛叶前部含原发味觉皮层；嗅觉是唯一不经丘脑、直达皮层的感觉，属考点特例。",
    points: [
      "味觉皮层位于岛叶前部。",
      "嗅觉特例：不经丘脑，嗅球→梨状皮层直接入皮层。",
      "嗅觉与情绪记忆紧密相连(普鲁斯特效应)。",
      "(本模型未含嗅球/梨状皮层，可自行文字补充。)"
    ] },
  { id: "attention", name: "注意与空间加工", en: "Attention", members: ["parietal", "pfc", "acc"],
    brief: "选择、维持与分配心理资源",
    detail: "顶叶负责空间定向，前额叶负责自上而下控制，前扣带负责冲突监测，共同构成注意网络。",
    points: [
      "选择性注意：鸡尾酒会效应；双耳分听实验。",
      "过滤器模型(Broadbent)→衰减模型(Treisman)→后期选择。",
      "注意三网络(Posner)：警觉、定向、执行控制。",
      "非注意盲视、变化盲视(看不见'大猩猩')。",
      "半侧空间忽视(右顶叶损伤)。"
    ] },
  { id: "motor", name: "运动控制", en: "Motor Control", members: ["m1", "striatum", "cerebellum"],
    brief: "发起、协调与流畅的动作",
    detail: "初级运动皮层发令，基底神经节(纹状体)选择与启动动作，小脑负责协调、平衡与精准时序。",
    points: [
      "运动'小人'：手与口面部的皮层代表区最大。",
      "基底神经节病变：帕金森(少动、僵直)、亨廷顿(多动、舞蹈样)。",
      "小脑负责运动学习与适应(镜画、棱镜适应)。",
      "程序性记忆/内隐学习：'会做但说不出'(如骑车)。"
    ] },
  { id: "language", name: "语言表达与理解", en: "Language", members: ["broca", "wernicke", "corpus_callosum"],
    brief: "语言的产生、理解与两半球协作",
    detail: "布洛卡区负责'说'，韦尼克区负责'懂'，胼胝体连接两半球——裂脑研究揭示语言偏侧化。",
    points: [
      "布洛卡失语(表达性)：能听懂但说话费力、电报式。",
      "韦尼克失语(接受性)：说话流利却空洞、听不懂别人。",
      "裂脑：切断胼胝体后，左视野(右脑)物体能认却说不出名(语言在左脑)。",
      "大脑偏侧化：约95%右利手语言在左半球。",
      "语言获得关键期(Lenneberg)；乔姆斯基普遍语法。"
    ] },
  { id: "decl_memory", name: "陈述性/空间记忆", en: "Declarative & Spatial Memory", members: ["hippocampus", "thalamus"],
    brief: "事实、事件与空间的记忆",
    detail: "海马把经历转为长期记忆并支持空间导航；丘脑/乳头体环路受损致柯萨可夫遗忘。",
    points: [
      "H.M.病例：海马受损→顺行性遗忘；外显/内隐分离。",
      "柯萨可夫综合征：丘脑/乳头体受损(酗酒)→顺行遗忘+虚构。",
      "三级记忆模型；巩固与再巩固。",
      "遗忘曲线(艾宾浩斯)、系列位置效应(首因/近因)。",
      "空间记忆：位置细胞、伦敦出租车司机研究。"
    ] },
  { id: "emo_memory", name: "情绪记忆", en: "Emotional Memory", members: ["amygdala"],
    brief: "带情绪的记忆更牢",
    detail: "杏仁核给记忆'贴情绪标签'，情绪越强记得越牢。",
    points: [
      "闪光灯记忆；情绪增强记忆巩固。",
      "恐惧条件反射(LeDoux)。",
      "PTSD：闪回与杏仁核-海马失衡。"
    ] },
  { id: "working_memory", name: "工作记忆", en: "Working Memory", members: ["pfc"],
    brief: "短时保持并操作信息",
    detail: "背外侧前额叶是工作记忆的核心座椅。",
    points: [
      "Baddeley模型：中央执行+语音环+视空画板+情景缓冲。",
      "容量7±2(米勒)→组块可扩容。",
      "与执行功能、流体智力密切相关。"
    ] },
  { id: "emotion", name: "情绪加工", en: "Emotion", members: ["amygdala", "acc", "insula"],
    brief: "情绪的产生、体验与调节",
    detail: "杏仁核产生情绪(尤其恐惧)，岛叶提供身体感受，前扣带监测冲突并调节。",
    points: [
      "情绪三理论：詹姆斯-兰格、坎农-巴德、沙赫特-辛格二因素。",
      "杏仁核与恐惧；LeDoux快慢通路。",
      "岛叶内感受；面部反馈假说。",
      "情绪调节(Gross)：认知重评优于表达抑制。",
      "基本情绪(Ekman)的跨文化普遍性。"
    ] },
  { id: "reward", name: "奖赏与成瘾", en: "Reward & Addiction", members: ["striatum", "pfc"],
    brief: "快感、动机与自控失衡",
    detail: "腹侧纹状体(伏隔核)处理奖赏，前额叶负责自控；自控不敌渴求即成瘾。",
    points: [
      "'快乐中枢'(Olds&Milner)：大鼠不停自我电刺激。",
      "多巴胺'奖赏预测误差'(Schultz)。",
      "强化程式：可变比率最顽固(老虎机、刷短视频)。",
      "成瘾：奖赏敏化↑ + 前额叶自控↓。",
      "延迟折扣与自我控制(棉花糖实验)。"
    ] },
  { id: "motivation", name: "基本动机（饥渴性）", en: "Basic Drives", members: ["hypothalamus"],
    brief: "饥、渴、体温、性等基本驱力",
    detail: "下丘脑调节摄食、饮水、体温与性行为，维持内稳态。",
    points: [
      "外侧下丘脑=摄食中枢，腹内侧=饱足中枢(损毁实验：一个不吃、一个暴食)。",
      "内稳态与驱力理论(坎农)。",
      "唤醒与绩效倒U(耶克斯-多德森)。",
      "马斯洛需求层次：生理需要是基础。"
    ] },
  { id: "executive", name: "执行控制与自控", en: "Executive Control", members: ["pfc", "acc"],
    brief: "计划、决策与冲动抑制",
    detail: "前额叶是执行'CEO'，前扣带监测错误与冲突，共同实现自我控制。",
    points: [
      "执行功能三成分(Miyake)：抑制、刷新、转换。",
      "菲尼亚斯·盖奇：前额叶损伤致人格与自控剧变。",
      "常用测验：WCST、Stroop、Go/No-go。",
      "前扣带错误监测：错误相关负波(ERN)。",
      "延迟满足、自我损耗争议。"
    ] },
  { id: "social", name: "社会认知与共情", en: "Social Cognition", members: ["insula", "pfc", "amygdala"],
    brief: "理解他人、共情与自我",
    detail: "杏仁核读情绪，岛叶与前扣带负责共情，内侧前额叶负责心理理论与自我参照。",
    points: [
      "心理理论(ToM)：错误信念任务(Sally-Anne)。",
      "共情的疼痛网络：前扣带+岛叶。",
      "杏仁核识别面部情绪；孤独症的社会脑异常。",
      "内侧前额叶：自我参照与'心智化'；镜像神经元。",
      "基本归因错误、刻板印象与内隐态度。"
    ] },
  { id: "arousal", name: "觉醒与睡眠", en: "Arousal & Sleep", members: ["brainstem", "thalamus", "hypothalamus"],
    fine: ["Pons=脑桥（REM开关/蓝斑）", "Hypothalamus=下丘脑（视交叉上核生物钟/睡眠开关）"],
    dis: ["insomnia", "narcolepsy", "rbd"],
    brief: "觉醒系统、睡眠分期与生物钟",
    detail: "脑干网状激活系统经丘脑维持皮层觉醒；下丘脑的睡眠开关和生物钟决定何时睡、何时醒；脑桥负责REM。",
    points: [
      "**上行网状激活系统**（Moruzzi & Magoun 1949）：脑干网状结构经丘脑弥散投射到皮层、维持觉醒；电刺激它能唤醒睡着的猫，损伤则导致昏迷。",
      "**睡眠分期与脑电**：清醒闭眼α波 → N1 θ波 → N2 睡眠纺锤波与K复合波（丘脑网状核产生）→ N3 δ慢波（深睡）→ REM（低幅快波、快速眼动、肌肉瘫痪）；约90分钟一个周期。",
      "**REM开关**：脑桥胆碱能神经元“REM-on”，蓝斑去甲肾上腺素和中缝核5-HT神经元“REM-off”，两者此消彼长（交互作用模型）。",
      "**睡眠-觉醒翻转开关**：促醒系统（蓝斑、中缝核、组胺、基底前脑、下丘脑外侧食欲素）与下丘脑腹外侧视前区的促眠GABA神经元互相抑制，食欲素是稳定器。",
      "**双过程模型**：腺苷积累的睡眠压力（过程S，咖啡因阻断腺苷受体）+ 视交叉上核的昼夜节律（过程C，黑暗中松果体分泌褪黑素）。",
      "**睡眠的功能**：慢波睡眠巩固陈述性记忆、分泌生长激素、类淋巴系统清除代谢废物；REM巩固程序性和情绪记忆；REM被剥夺后出现REM反跳。",
      "**年龄变化**：新生儿REM约占50%，成年约20–25%；深睡随年龄明显减少。"
    ] },
  { id: "stress", name: "应激与HPA轴", en: "Stress & HPA axis", members: ["hypothalamus", "pituitary", "amygdala", "hippocampus", "pfc"],
    fine: ["Pons=脑桥蓝斑（交感启动）"],
    dis: ["mdd", "ptsd", "gad"],
    brief: "两条应激通路、负反馈与适应负荷",
    detail: "杏仁核感知威胁后，下丘脑同时启动快速的交感-肾上腺髓质轴和较慢的下丘脑-垂体-肾上腺（HPA）轴；海马和前额叶负责踩刹车。",
    points: [
      "**交感-肾上腺髓质轴（SAM）**：下丘脑 → 交感神经 → 肾上腺髓质分泌肾上腺素、去甲肾上腺素 → 几秒内心跳加快、血压和血糖升高、瞳孔放大、消化暂停（坎农“战或逃”）。",
      "**HPA轴**：下丘脑室旁核分泌**CRH** → 垂体前叶分泌**ACTH** → 肾上腺皮质分泌**皮质醇** → 升高血糖、动员能量、抑制免疫和炎症（几分钟到几小时）。",
      "**负反馈**：皮质醇作用于海马、下丘脑、垂体的糖皮质激素受体（GR）和盐皮质激素受体（MR）→ 抑制CRH和ACTH → 应激后回落。**海马是刹车，杏仁核是油门**，前额叶也参与抑制。",
      "**昼夜节律**：皮质醇在醒后30–45分钟达到高峰（皮质醇觉醒反应），夜间最低。",
      "**塞利一般适应综合征**：警觉期 → 抵抗期 → 衰竭期（资源耗竭，易患病）。",
      "**适应负荷**（McEwen）：长期、不可控的应激累积代价——高血压、腹部肥胖、免疫抑制；海马和前额叶树突萎缩，而杏仁核树突增生 → 越来越焦虑、越来越难调控。",
      "**两种失调**：抑郁常见皮质醇偏高、负反馈减弱（地塞米松不抑制）；PTSD常见基础皮质醇偏低、负反馈过强。",
      "**适度应激有益**：短暂、可控的应激提升注意和记忆（倒U）；社会支持、可控感、认知重评能减弱HPA反应。"
    ] },
  { id: "pain", name: "痛觉", en: "Pain", members: ["s1", "insula", "acc", "thalamus", "brainstem"],
    fine: ["Midbrain=中脑导水管周围灰质（PAG，内源性镇痛）"],
    dis: ["somatic"],
    brief: "痛的感觉成分、情绪成分与内源性镇痛",
    detail: "痛觉信号经脊髓丘脑束到丘脑，再分两路：躯体感觉皮层判断“哪里痛、多痛”，前扣带和岛叶决定“多难受”；中脑导水管周围灰质发出下行镇痛。",
    points: [
      "**伤害感受器**：游离神经末梢；**Aδ纤维**有髓、快 → 尖锐的刺痛（第一痛）；**C纤维**无髓、慢 → 持续的灼痛钝痛（第二痛）。",
      "**上行通路**：脊髓背角 → 脊髓丘脑束 → 丘脑 → 两路：初级躯体感觉皮层（位置、强度——感觉成分）与前扣带、岛叶（不愉快——情绪成分）。",
      "**证据**：催眠暗示让人觉得“没那么难受”时，前扣带活动下降而躯体感觉皮层不变（Rainville 1997）；被社会排斥的“心痛”也激活前扣带。",
      "**闸门控制理论**（Melzack & Wall 1965）：脊髓背角有“闸门”，粗纤维的触压觉输入和大脑的下行信号能关闭闸门、减弱痛觉传递——揉一揉就不那么疼；注意、情绪和预期都能调节疼痛。",
      "**内源性镇痛**：中脑导水管周围灰质（PAG）→ 延髓 → 脊髓背角，释放**内啡肽**及5-HT、NE，抑制痛觉传入；电刺激PAG可以强力镇痛；吗啡就作用于这一系统的μ受体。",
      "**安慰剂镇痛**：期待激活前额叶 → PAG的内源性阿片系统，可被阿片拮抗剂纳洛酮阻断——安慰剂效应有真实的生理基础。",
      "**幻肢痛**：截肢后躯体感觉皮层中相邻区域“入侵”原手臂代表区（皮层重组，Ramachandran）；镜像疗法能缓解。",
      "**慢性疼痛**：中枢敏化，痛觉系统本身变得过度敏感；与抑郁焦虑高度共病，SNRI类抗抑郁药也能镇痛（增强下行抑制）。"
    ] },
  { id: "split_brain", name: "两半球分工与裂脑", en: "Lateralization", members: ["corpus_callosum", "broca", "wernicke", "parietal", "v1"],
    dis: ["aphasia", "neglect"],
    brief: "胼胝体、交叉支配与大脑偏侧化",
    detail: "左右半球通过胼胝体交换信息；切断胼胝体后，两个半球各自“知道”不同的东西——裂脑研究揭示了大脑的偏侧化。",
    points: [
      "**交叉支配**：左半球控制右侧身体、接收右视野信息，右半球反之；视交叉处双眼鼻侧视网膜的纤维交叉，所以每个半球“看到”对侧视野。",
      "**裂脑研究**（Sperry & Gazzaniga，1981年诺贝尔奖）：为治疗顽固癫痫切断胼胝体后，把图片只呈现在左视野（进入右半球），病人说不出是什么，却能用左手从一堆物体中摸出它——右半球“知道”但不会说。",
      "**左半球“解释器”**（Gazzaniga）：左半球会为右半球引起的行为编出合理解释——提示意识中的“自我叙事”主要由左半球完成。",
      "**分工（相对而非绝对）**：左半球——语言、逻辑分析、序列加工、细节；右半球——空间、面孔识别、情绪和语调、整体加工、注意两侧空间。“左脑人/右脑人”是流行误读。",
      "**测定语言优势半球**：**Wada测验**（向一侧颈动脉注射异戊巴比妥，麻醉一侧半球看能否说话）；**双耳分听**中多数人右耳（左半球）优势。",
      "**比例**：约95%右利手和约70%左利手的语言在左半球；手语的语言功能同样在左半球。",
      "**可塑性**：先天性胼胝体发育不全者通过前连合等其他通路代偿，症状比手术切断者轻得多。"
    ] },
  { id: "nt_basics", name: "突触传递与药物作用原理", en: "Synapse & Drugs", members: [],
    fine: ["Midbrain=中脑（多巴胺/5-HT源头）", "Pons=脑桥（蓝斑/中缝核）", "Septal_nuclei=基底前脑（乙酰胆碱）"],
    brief: "看懂所有精神药物的基础",
    detail: "神经元靠电信号在细胞内传导、靠化学递质在突触间传递；几乎所有精神药物都是在突触的某个环节“动手脚”。模型上标出的是几种主要递质的源头核团。",
    points: [
      "**动作电位**：静息电位约-70mV；兴奋达到阈值时钠离子内流、去极化，产生“全或无”的动作电位，沿轴突传导；**髓鞘**让它跳跃式传导、速度快几十倍（多发性硬化就是髓鞘受损）。",
      "**突触传递**：动作电位到达末梢 → 钙离子内流 → 突触囊泡与细胞膜融合、释放递质 → 递质结合突触后受体 → 产生兴奋性（EPSP）或抑制性（IPSP）突触后电位，在胞体上空间和时间总和后决定是否放电。",
      "**两类受体**：**离子型**（受体本身就是离子通道，毫秒级、快，如GABA-A、NMDA、AMPA、烟碱型ACh、5-HT3）；**代谢型**（经G蛋白和cAMP等第二信使，慢而持久，如多巴胺、去甲肾上腺素、多数5-HT受体、毒蕈碱型ACh）。",
      "**递质的清除**：被转运体回收到突触前（**再摄取**，SSRI和可卡因作用于此）、被酶降解（单胺氧化酶MAO、乙酰胆碱酯酶）、扩散走。",
      "**自身受体**：位于突触前末梢或胞体上，感受自己释放的递质并抑制进一步释放——负反馈的“恒温器”（5-HT1A、α2、D2自身受体），是SSRI起效慢、米氮平起效原理的关键。",
      "**药物下手的环节**：合成（L-DOPA补原料）→ 储存（利血平耗竭囊泡）→ 释放（苯丙胺促释放）→ 受体（激动剂：吗啡；拮抗剂：纳洛酮、氟哌啶醇；部分激动剂：丁丙诺啡、阿立哌唑）→ 回收（SSRI、可卡因）→ 降解（MAOI、多奈哌齐）。",
      "**长期用药的适应**：受体长期被阻断 → **上调**、变敏感（停药反跳、迟发性运动障碍）；长期被过度刺激 → **下调**（耐受）。这是耐受、依赖、戒断和“起效慢”的共同基础。",
      "**血脑屏障**：脑毛细血管内皮细胞紧密连接，阻挡大多数大分子和水溶性物质——多巴胺进不去而L-DOPA可以；脂溶性高的药物（如海洛因比吗啡）进脑更快、更易成瘾。"
    ] },
  { id: "nt_dopamine", name: "多巴胺系统", en: "Dopamine", members: ["striatum", "pfc"],
    fine: ["Midbrain=中脑（VTA/黑质：多巴胺源头）", "Hypothalamus=下丘脑弓状核（结节漏斗通路）"],
    dis: ["parkinson", "schizophrenia", "addiction", "adhd", "huntington"],
    brief: "奖赏、动机、运动与工作记忆",
    detail: "多巴胺神经元集中在中脑的黑质和腹侧被盖区（VTA），沿四条通路投射，分别负责运动、奖赏动机、认知和内分泌调节。",
    points: [
      "**合成**：酪氨酸 →（酪氨酸羟化酶，限速步骤）→ L-DOPA → 多巴胺 →（在去甲肾上腺素能神经元中）去甲肾上腺素。",
      "**黑质纹状体通路**（黑质 → 纹状体）：运动的启动；退化 → 帕金森病；被抗精神病药阻断 → 锥体外系反应。",
      "**中脑边缘通路**（VTA → 伏隔核、杏仁核）：奖赏预测误差、“想要”与动机；过强 → 精神分裂症阳性症状、成瘾。",
      "**中脑皮层通路**（VTA → 前额叶）：工作记忆与执行功能（D1受体倒U）；不足 → 阴性症状、认知症状、ADHD。",
      "**结节漏斗通路**（下丘脑 → 垂体）：抑制催乳素分泌；被阻断 → 催乳素升高。",
      "**受体**：D1类（D1、D5，兴奋性，增加cAMP）与D2类（D2、D3、D4，抑制性）；抗精神病药主要阻断D2。",
      "**相关药物**：L-DOPA、可卡因（阻断回收）、苯丙胺（促释放）、哌甲酯、安非他酮、抗精神病药、多巴胺受体激动剂。"
    ] },
  { id: "nt_serotonin", name: "5-羟色胺系统", en: "Serotonin", members: ["pfc", "amygdala", "hippocampus", "hypothalamus"],
    fine: ["Midbrain=中缝背核（中脑）", "Pons=中缝核群（脑桥）"],
    dis: ["mdd", "gad", "ocd", "bulimia"],
    brief: "情绪稳定、冲动控制、睡眠与食欲",
    detail: "5-HT神经元集中在脑干中线的中缝核群，投射几乎遍及全脑和脊髓；它更像一个调节全脑“基调”的系统。",
    points: [
      "**合成**：色氨酸（必需氨基酸，只能从食物获得）→ 5-羟色氨酸 → 5-HT；由单胺氧化酶（MAO-A）分解，代谢物是5-HIAA；松果体里5-HT再转化为**褪黑素**。",
      "**受体至少14种**：**5-HT1A**（抑制性，也是中缝核的自身受体，丁螺环酮作用点）、**5-HT2A**（LSD、裸盖菇素等致幻剂的作用点，非典型抗精神病药阻断它）、**5-HT3**（唯一的离子型，止吐药靶点）等。",
      "**功能**：情绪稳定、抑制冲动和攻击、焦虑、睡眠-觉醒（REM-off）、食欲与饱足、痛觉的下行抑制。",
      "**低5-HT与冲动性攻击、自杀**相关：自杀死亡者和冲动性暴力犯的脑脊液5-HIAA偏低。",
      "人体约**90%**的5-HT在肠道，调节胃肠蠕动——所以SSRI早期常见恶心、腹泻。",
      "**相关药物**：SSRI/SNRI、三环类、MAOI、丁螺环酮、非典型抗精神病药；摇头丸（MDMA）大量释放5-HT，之后耗竭导致“周二忧郁”。"
    ] },
  { id: "nt_ne", name: "去甲肾上腺素系统", en: "Norepinephrine", members: ["pfc", "amygdala", "hippocampus", "thalamus", "hypothalamus"],
    fine: ["Pons=脑桥蓝斑（去甲肾上腺素源头）"],
    dis: ["panic", "ptsd", "adhd", "mdd"],
    brief: "警觉、注意、应激与情绪记忆",
    detail: "脑内去甲肾上腺素主要来自脑桥的蓝斑——只有几万个神经元，却投射到整个皮层、海马、杏仁核、丘脑和小脑；外周则是交感神经的递质。",
    points: [
      "**警觉与觉醒**：蓝斑在清醒时放电、慢波睡眠时减少、REM时几乎沉默。",
      "**注意的“增益调节”**：适中时专注任务；过高时注意涣散、焦虑——耶克斯-多德森倒U的生理基础之一（Aston-Jones）。",
      "**情绪记忆巩固**：杏仁核的β受体被激活后增强海马记忆巩固——情绪事件记得牢，也是PTSD创伤记忆过深的原因。",
      "**受体**：α1（兴奋，血管收缩）、α2（多为突触前自身受体，抑制释放；在前额叶突触后则增强工作记忆）、β（增加心率、促进记忆巩固）。",
      "**外周**：交感神经节后纤维释放NE；肾上腺髓质分泌肾上腺素和NE——“战或逃”。",
      "**相关药物**：SNRI、三环类、托莫西汀、可乐定/胍法辛（α2激动剂）、育亨宾（α2拮抗剂，可诱发焦虑和惊恐）、普萘洛尔（β阻断剂）、哌唑嗪（α1阻断剂）。"
    ] },
  { id: "nt_ach", name: "乙酰胆碱系统", en: "Acetylcholine", members: ["hippocampus", "pfc", "thalamus"],
    fine: ["Septal_nuclei=隔核/基底前脑（胆碱能）", "Pons=脑桥被盖（REM启动）"],
    dis: ["alzheimer"],
    brief: "注意、学习记忆、REM与肌肉收缩",
    detail: "脑内乙酰胆碱主要来自基底前脑（投射到皮层和海马）和脑桥-中脑被盖（投射到丘脑）；外周是运动神经和副交感神经的递质。",
    points: [
      "**来源**：基底前脑的迈纳特基底核（→ 皮层）、内侧隔核（→ 海马，驱动海马θ节律）；脑桥-中脑被盖核团（→ 丘脑，觉醒和REM）。",
      "**功能**：注意、学习与记忆编码、皮层觉醒；REM期乙酰胆碱很高，而NE和5-HT很低。",
      "**外周**：所有骨骼肌的神经肌肉接头、副交感神经都用乙酰胆碱。",
      "**受体**：**烟碱型**（离子型，快；尼古丁作用点，也在肌肉上）与**毒蕈碱型**（代谢型；阿托品、东莨菪碱阻断）。",
      "**分解**：乙酰胆碱酯酶迅速分解；抑制此酶的药物（多奈哌齐）用于阿尔茨海默病；有机磷农药和沙林毒气不可逆地抑制此酶而致命。",
      "**相关障碍**：阿尔茨海默病（基底前脑胆碱能神经元丢失）、重症肌无力（抗体攻击肌肉上的烟碱受体）；抗胆碱药（部分三环类、苯海拉明）引起口干、便秘、记忆变差，老年人易谵妄。"
    ] },
  { id: "nt_gaba_glu", name: "GABA与谷氨酸", en: "GABA & Glutamate", members: ["pfc", "hippocampus", "thalamus", "amygdala", "cerebellum"],
    dis: ["gad", "insomnia", "schizophrenia", "addiction"],
    brief: "大脑的油门与刹车",
    detail: "谷氨酸是最主要的兴奋性递质，GABA是最主要的抑制性递质，两者遍布全脑；它们的平衡决定大脑的兴奋水平。",
    points: [
      "**谷氨酸**：最主要的兴奋性递质；**GABA**：最主要的抑制性递质，由谷氨酸经谷氨酸脱羧酶转化而来。",
      "**AMPA受体**介导快速兴奋；**NMDA受体**需要“谷氨酸结合 + 突触后已去极化（解除镁离子阻塞）”同时满足才开放，钙离子内流 → **长时程增强（LTP）**——学习记忆的细胞机制。",
      "**NMDA受体拮抗剂**：氯胺酮、苯环己哌啶（PCP）——麻醉、解离、致幻；也是精神分裂症谷氨酸假说的依据；氯胺酮小剂量可快速抗抑郁。",
      "**兴奋性毒性**：卒中、缺氧时谷氨酸大量释放 → 钙超载 → 神经元死亡；美金刚通过适度阻断NMDA受体保护神经元。",
      "**GABA-A受体**：氯离子通道；**苯二氮䓬类**（增加开放频率）、**巴比妥类**（延长开放时间）、**酒精**、麻醉药都增强它 → 镇静、抗焦虑、抗惊厥、肌松；它们彼此叠加，合用可致呼吸抑制。",
      "**GABA-B受体**：代谢型，巴氯芬（肌松药）作用于此。",
      "**相关障碍**：癫痫（兴奋-抑制失衡）、焦虑、失眠；**酒精戒断**：长期饮酒后GABA受体下调、NMDA受体上调，突然停酒 → 过度兴奋 → 震颤、癫痫、震颤谵妄，可致命。"
    ] },

  // ===== 以下为对照北大347真题新增的功能分组（只写脑机制）=====
  { id: "perception", name: "知觉组织与深度知觉", en: "Perceptual Organization", members: ["visual_pathway", "v1", "parietal"],
    brief: "格式塔、恒常性、深度与颜色",
    detail: "视觉信息经视觉通路进入V1，再分腹侧(是什么)、背侧(在哪里)两条通路在颞叶和顶叶整合，形成稳定、有组织的知觉。",
    points: [
      "V1提取边缘和朝向；枕颞区(腹侧)识别物体，顶叶(背侧)判断位置和深度。",
      "格式塔组织：V1神经元的横向连接让首尾相接的线段相互增强，高级视区整合完整轮廓。",
      "恒常性：大脑用顶叶估计的距离校正视网膜像的大小。",
      "颜色：视网膜三色 → 外侧膝状体拮抗编码。"
    ] },
  { id: "consciousness", name: "意识与无意识加工", en: "Consciousness", members: ["thalamus", "v1", "amygdala", "pfc", "parietal"],
    brief: "意识、无意识、注意分配与睡眠",
    detail: "意识化需要前额叶-顶叶网络的大范围激活(全局工作空间)，丘脑维持觉醒；盲视和阈下恐惧面孔说明没有意识也能加工。",
    points: [
      "意识化 = 前额叶-顶叶网络大范围同步“点火”。",
      "盲视：绕过V1的上丘-丘脑通路，看不见却能指出位置。",
      "阈下恐惧面孔仍经丘脑快路激活杏仁核。",
      "丘脑和脑干维持觉醒，是意识的前提；REM由脑桥发动。"
    ] },
  { id: "learning", name: "学习与条件反射", en: "Learning & Conditioning", members: ["striatum", "amygdala", "cerebellum", "hippocampus"],
    brief: "强化、惩罚、条件反射与习惯",
    detail: "纹状体接收多巴胺奖赏信号，支撑操作条件反射与习惯；杏仁核负责恐惧条件反射；小脑储存眨眼条件反射；海马负责陈述性学习。",
    points: [
      "多巴胺奖赏预测误差 → 纹状体：操作条件反射。",
      "杏仁核外侧核：恐惧条件反射。",
      "小脑：眨眼条件反射。",
      "腹侧 → 背侧纹状体：从目标导向行为变成习惯。"
    ] },
  { id: "thinking", name: "思维与决策", en: "Thinking & Decision", members: ["pfc", "acc", "amygdala", "insula", "striatum"],
    brief: "双系统、启发式与框架效应",
    detail: "背外侧前额叶支撑慎思推理，前扣带检测冲突，杏仁核与岛叶提供直觉和情绪信号，纹状体和腹内侧前额叶计算价值。",
    points: [
      "背外侧前额叶：按规则推理、工作记忆（慢系统）。",
      "腹内侧前额叶/眶额：整合价值、做选择。",
      "前扣带：发现直觉与逻辑的冲突。",
      "杏仁核、岛叶：情绪与损失信号（框架效应、损失厌恶）。"
    ] },
  { id: "personality_fn", name: "人格与自我控制", en: "Personality & Self-control", members: ["pfc", "amygdala", "striatum", "acc"],
    brief: "人格差异与自控力的脑基础",
    detail: "人格差异有一定神经基础：神经质与杏仁核反应性、外倾性与奖赏系统敏感性、尽责性和自控力与前额叶有关(研究提示)。",
    points: [
      "外倾：奖赏系统敏感；内倾：基础唤醒高（艾森克）。",
      "神经质：杏仁核对负性刺激反应强。",
      "尽责性与自控：外侧前额叶。",
      "A型人格：应激系统（HPA轴、交感神经）长期激活。"
    ] },
  { id: "dev_brain", name: "发展中的大脑", en: "Developing Brain", members: ["m1", "cerebellum", "pfc", "striatum", "amygdala"],
    brief: "从婴儿动作到青春期",
    detail: "运动皮层与小脑的成熟支撑动作发展；前额叶成熟最晚(约25岁)，而青春期纹状体奖赏系统先变敏感——这种'双系统'失衡解释了青少年的冒险与冲动。",
    points: [
      "髓鞘化由后向前、由下向上：感觉运动区最早，前额叶最晚（约25岁）。",
      "突触先过量生成再修剪，“用进废退”。",
      "青春期：纹状体奖赏敏感先于前额叶控制成熟。",
      "早期照料塑造杏仁核-前额叶的情绪调节回路。"
    ] }
];

// ============ 数据驱动的左栏「按功能」目录（大类 → 功能id）============
// 心理障碍已移到「变态」选项卡（disorders.js）。
export const FUNCTION_TREE = [
  { cat: "基础感觉通道", ids: ["vision", "hearing", "somatosensory", "pain", "chemical"] },
  { cat: "知觉、意识与注意", ids: ["perception", "attention", "consciousness"] },
  { cat: "运动与行为", ids: ["motor"] },
  { cat: "语言与两半球", ids: ["language", "split_brain"] },
  { cat: "学习与记忆", ids: ["learning", "decl_memory", "emo_memory", "working_memory"] },
  { cat: "思维与决策", ids: ["thinking"] },
  { cat: "情绪、动机与奖赏", ids: ["emotion", "reward", "motivation"] },
  { cat: "人格与发展", ids: ["personality_fn", "dev_brain"] },
  { cat: "高级认知与社会功能", ids: ["executive", "social"] },
  { cat: "生存节律与内环境", ids: ["arousal", "stress"] },
  { cat: "神经递质系统（药物作用的基础）", ids: ["nt_basics", "nt_dopamine", "nt_serotonin", "nt_ne", "nt_ach", "nt_gaba_glu"] }
];

// 兼容：信息卡标签用（保留）
export const SYSTEMS = {
  sensorimotor: { label: "感觉·运动·语言区", color: "#74c0fc" },
  limbic: { label: "边缘系统", color: "#c08a82" },
  cortex: { label: "皮层区", color: "#c9b98a" },
  deep: { label: "深部结构", color: "#97a6c0" },
  endocrine: { label: "内分泌", color: "#cba7ad" }
};
