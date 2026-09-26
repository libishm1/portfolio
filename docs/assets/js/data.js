/* All portfolio content lives here. Copy rules (from the print portfolio): no em dashes, use a hyphen or a middle dot.
   Images are referenced by slug: media/<slug>-640.webp and media/<slug>-1600.webp (sizes in media.js).
   Gallery entry: ['slug', 'caption', {wide:true, contain:true}] - the first entry is the hero. */
window.PORTFOLIO = {
  featureSlug: 'kuppam-gpr',
  feature: {"video": {"src": "media/video/kuppam-film-720.mp4", "poster": "media/video/kuppam-film-poster.webp", "label": "Kuppam GPR film, 90 seconds, captions on screen", "cap": "The 90 s film, as posted on LinkedIn · captions on screen · music: “A New Life”, Eugenio Mininni (Mixkit)"}, "iframe": "https://libishm1.github.io/Kuppam_granite-deposit_GPR-Fracture_study/", "iframePoster": "kuppam-viewer"},

  // LinkedIn: paste the post URL into `post`. For an inline embed, use LinkedIn's "Embed this post" code
  // and copy only the iframe src, e.g. https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:1234567890
  linkedin: { post: '', embed: '' },

  ticker: ['Robotic fabrication', 'Scan-to-fabricate', 'Ground-penetrating radar', 'Photogrammetry', 'Stone packing', 'Rubble vaults', 'ROS 2 · MoveIt 2', 'UR10e · KUKA · ABB', 'Rhino 8 · Grasshopper', 'Open3D', 'Heritage reconstruction', 'Non-planar printing', 'Auxetic metal', 'IFC · BIM software'],

  stats: [
    { v: '11', k: 'years of work · 2015 - 2026' },
    { v: '27', k: 'projects & studies here' },
    { v: '275', k: 'Frahan StonePack components' },
    { v: '14,315', k: 'GPR picks · Kuppam pilot' },
  ],

  sections: [
    { id: 'A', chip: 'Robotic fabrication', title: 'Robotic Fabrication & Material Computation', short: 'Spolia · timber · metal · lattice · Möbius', bg: '#15142C',
      blurb: 'Building the perception, geometry and motion systems that let machines fabricate with non-standard materials - irregular timber, salvaged stone, sheet metal and clay.' },
    { id: 'B', chip: 'Sensing & heritage', title: 'Sensing, Reconstruction & Heritage', short: 'GPR · photogrammetry · depth · thermal', bg: '#1B2A33',
      blurb: 'Radar, photogrammetry, monocular depth and thermal sensing turned toward stone, quarries and cultural-heritage documentation - much of it open-sourced with datasets.' },
    { id: 'C', chip: 'Tools & software', title: 'Computational Tools & Software', short: 'Frahan · IFC · robotics · fabrication', bg: '#262433',
      blurb: 'Productised research: a stone-fabrication plugin, browser-native BIM analysis, reproducible robot stacks and digital-fabrication tools that put computational design in other people’s hands.' },
    { id: 'D', chip: 'Architecture & studio', title: 'Architecture, Site & Studio Work', short: 'terrain · pavilions · housing · studios', bg: '#2A1F1A',
      blurb: 'Professional site engineering, pavilions, housing and academic studios where computational methods meet built, terrain and spatial design.' },
  ],

  extraContents: [
    { href: '#lab', tag: '3D', title: '3D Lab', sub: 'rubble vaults and masonry you can turn and take apart', n: 'interactive' },
    { href: '#publications', tag: '§', title: 'Publications', sub: 'papers, preprints and datasets with DOIs', n: '' },
    { href: '#archive', tag: '↺', title: 'Archive', sub: 'the 2015 - 2022 portfolio, 23 plates', n: '23 plates' },
  ],

  projects: [
    // ================= A · Robotic Fabrication =================
    { slug: 'automated-spolia', section: 'A', year: '2021', feature: true, robot: true,
      kicker: 'Graduate Thesis · MRAC, IAAC Barcelona', title: 'Automated Spolia', sub: 'Perception-assisted robotic placement of salvaged demolition stone',
      meta: ['2021', 'Robotic perception', 'Thesis'],
      lead: 'Reusing irregular stone shards from demolition waste by letting a robot see, plan and place them.',
      body: 'The system pairs robotic perception with a digital twin to tile an irregular substrate with non-standard stone fragments. Noisy depth scans are cleaned through Taubin smoothing, downsampling and Poisson sampling; a packing engine then selects and orients each shard by shape, size and surface curvature.\nRather than authoring explicit machine intelligence, the project frames fabrication as a collaborative loop - empowering digital artists with offline and semi-real-time robotic workflows that solve placement through visual perception and force-torque feedback.',
      contrib: ['Mesh processing + digital-twin pipeline for robotic motion planning', 'Curvature-aware packing of irregular stone fragments in 2D and 3D', 'Collision-checked motion planning with servo force-torque feedback'],
      tags: ['Open3D', 'UR10e', 'ROS', 'Grasshopper', 'Packing'], links: [{ label: 'GitHub', url: 'https://github.com/libishm1' }],
      steps: { title: 'Geometry pipeline · scan to packed surface', items: [
        ['old-spolia-substrate', 'Noisy depth scan'], ['old-spolia-mesh-points', 'Taubin + Poisson sampling'], ['old-spolia-mesh-tri', 'Downsampled mesh'], ['old-spolia-mesh-normals', 'Face normals'], ['old-spolia-twin-pack', 'Curvature-aware packing'] ] },
      images: [
        ['old-spolia-ur-wide', 'UR arm placing salvaged shards onto the scanned substrate'],
        ['old-spolia-twin-pack', 'Digital twin with packing: shards placed by shape, size and surface curvature', { wide: true }],
        ['old-spolia-motion-plan', 'Collision-aware motion planning: every shard pose becomes a robot target'],
        ['old-spolia-ur-real', 'Servo real-time placement with force-torque feedback'],
        ['old-spolia-sim', 'Digital twin of the UR cell'],
        ['old-spolia-packed-render', 'Packed shard surface'],
        ['old-spolia-seg', 'Open3D segmentation of shards on the table', { wide: true }],
        ['old-spolia-poses', 'Shard poses for grasping'],
        ['old-spolia-ur-right', 'UR arm over the packed tray'],
        ['old-spolia-toolpath', 'Non-planar overprint toolpath for gluing'],
        ['old-spolia-clay-print', 'Non-planar overprint'],
        ['old-spolia-substrate', 'Noisy mesh from the depth camera'],
        ['old-spolia-mesh-points', 'Taubin smoothing and Poisson sampling'],
        ['old-spolia-mesh-tri', 'Mesh downsampling'],
        ['old-spolia-mesh-normals', 'Face-normal computation'],
      ] },

    { slug: 'cclt', section: 'A', year: '2021', robot: true,
      kicker: 'Studio 3 · MRAC', title: 'CCLT · Curved Cross-Laminated Timber', sub: 'Recycling wood offcuts into bespoke double-curved panels',
      meta: ['2021', 'Material computation', 'Robotic CNC'],
      lead: 'Turning rough pine offcuts from wood manufacturing into self-shaping, double-curved laminated products.',
      body: 'A bottom-up approach to mitigate and understand material manufacturing affordances. The project studies how moisture-driven self-shaping and curve-creasing patterns can be steered toward explicit target geometry.\nMachine-learning pipelines augment the selection of curvatures across segmented panels, narrowing a wide material design space down to a usable design algorithm - with robot calibration closing the loop to fabrication.',
      contrib: ['Self-shaping wood characterisation (moisture, thickness, deflection)', 'ML-assisted curvature selection across segmented panels', 'Robot-calibrated lamination + creasing workflow'],
      tags: ['Self-shaping wood', 'ML', 'Robot calibration', 'Grasshopper'], links: [],
      images: [
        ['d-cclt-arch-v2', 'Creased double-curvature arch from segmented panels', { wide: true }],
        ['old-cclt-robot-mill-a', 'Robotic milling of a laminated panel'],
        ['old-cclt-robot-mill-b', 'Robotic milling close-up'],
        ['old-cclt-deflection', 'Self-shaping deflection study across six panels'],
        ['old-cclt-offcuts', 'Pine offcuts as the raw material'],
        ['old-cclt-arch', 'Extrapolation on double curvature using curve-creasing patterns'],
      ] },

    { slug: 'log-pavilion', section: 'A', year: '2021', robot: true,
      kicker: 'Robotic Workshop · on-site', title: 'Log Pavilion', sub: 'Scan-to-fabricate pavilion from irregular wooden logs',
      meta: ['2021', 'Scan-to-fabricate', 'Pavilion'],
      lead: 'Each irregular log is scanned, then a geometry-processing pipeline automates design and planning.',
      body: 'The pavilion is built entirely from irregular found logs. A scan-to-design database coordinates member geometry - end diameters, planes, overall length - while a design-to-fabrication algorithm resolves joinery, orientation and joint generation.\nThe scan-to-build workflow forms a complete solution from raw material to processing and assembly, with the computational arrangement of scans driving detail matching at every joint.',
      contrib: ['Scan-to-design database + geometry-processing pipeline', 'Automated joinery, orientation and joint generation', 'Raw-material-to-assembly fabrication planning'],
      tags: ['3D scanning', 'Point cloud', 'Grasshopper', 'Joinery'], links: [],
      images: [
        ['old-log-robot', 'KUKA arm processing a scanned log'],
        ['old-log-scan', 'Log scanned on its reference jig'],
        ['old-log-bench', 'Resolved bench from matched logs'],
        ['old-log-column', 'Log column with top, middle and footing joinery'],
      ] },

    { slug: 'crease-forming', section: 'A', year: '2022', robot: true,
      kicker: 'Studio 1 · MRAC · eCAADe 2022', title: 'Crease Forming', sub: '“Programming Twist” - origami-inspired robotic metal forming',
      meta: ['2022', 'Published · eCAADe', 'Sheet metal'],
      lead: 'Exploring the geometric affordances of aluminium through flexible, robotic forming workflows.',
      body: 'Forming workflows on a robotic arm, inspired by traditional metal-forming and approximated by origami folding and rapid physics simulation to iterate ideas. A wheel cutter on a small workshop hydraulic press, fed by a robot, realises the design-to-production pipeline.\nThe automated, small-payload setup tolerates a wide variety of geometric possibilities; spring-back and elastic/plastic deformation are documented as first-class fabrication parameters.',
      contrib: ['Origami + physics-approximated forming design space', 'Automated design-to-production robotic pipeline', 'Documented spring-back / plastic-deformation tolerances'],
      tags: ['Aluminium', 'Origami', 'Physics sim', 'Robotic forming'], links: [{ label: 'Paper · eCAADe 2022', url: 'https://doi.org/10.52842/conf.ecaade.2022.2.399' }],
      credits: 'Paper: Papandreou, Baseta, Mathe, Blackburn, Murugesan · eCAADe 2022, Ghent, Vol. 2, pp. 399-408.',
      images: [
        ['old-crease-robot-sheet', 'ABB arm feeding aluminium sheet into the forming station'],
        ['old-crease-twists', 'Crease-formed twist demonstrator'],
        ['old-crease-robot-press', 'Robot and hydraulic-press cell with a wheel cutter', { wide: true }],
        ['old-crease-surfaces', 'Extrapolations on double curvature using curve-creasing patterns', { wide: true, contain: true }],
        ['dx-page-05-3', 'Crease-pattern surface study'],
        ['dx-page-05-5', 'Double-curved crease surface'],
      ] },

    { slug: 'lattice-printing', section: 'A', year: '2021', robot: true,
      kicker: 'Workshop · MRAC', title: 'Non-planar Lattice 3D Printing', sub: 'Space-frame lattices printed on a robotic arm',
      meta: ['2021', 'Non-planar AM', 'Robotic arm'],
      lead: 'Pushing non-planar 3D-printing toward self-supporting space-frame lattice structures.',
      body: 'The project prints non-planar space-frame lattices with PLA on a robotic arm. The hardest problem is the apex of the pyramidal module: extruder stop / wait / cool timing decides whether material sticks to the tip and drags, or stays too soft to support itself.\nDeviations across the 0.5 m span are characterised and corrected layer by layer, yielding a repeatable, fabricable lattice module.',
      contrib: ['Non-planar toolpathing for space-frame lattices', 'Apex stop/cool timing strategy for clean nodes', 'Span-deviation correction for a repeatable module'],
      tags: ['Non-planar AM', 'PLA', 'Robotic arm', 'Toolpathing'], links: [],
      images: [
        ['old-lattice-module', 'The repeatable lattice module'],
        ['old-lattice-apex', 'Printing the apex of the pyramid (16x speed)'],
        ['old-lattice-layer', 'Printing the second layer of the lattice'],
        ['old-lattice-span', 'The space-frame prototype, 0.5 m span', { wide: true }],
        ['d-cover-min', 'Non-planar printed shell, the portfolio cover', { wide: true }],
      ] },

    { slug: 'mobius', section: 'A', year: '2020', robot: true,
      kicker: 'Project Associate · IISc Bangalore', title: 'Robotic Views of a Möbius Strip', sub: 'Stereo reconstruction with a robot-mounted camera',
      meta: ['2020', 'Computer vision', 'IISc'],
      lead: 'Experimental robotic workflows in computer vision, reconstructing surfaces from many views.',
      body: 'A stereo camera system mounted on a robotic arm triangulates markers across a Möbius strip using multiple-view geometry. The robot provides controlled, repeatable camera poses for reconstruction.\nThe work tests and benchmarks novel computer-vision algorithms to recover surfaces, alongside a software pipeline that extracts robot poses and camera position for reconstruction.',
      contrib: ['Robot-driven multi-view stereo capture', 'Marker triangulation across a non-orientable surface', 'Pose-extraction pipeline for reconstruction'],
      tags: ['Stereo', 'Multi-view geometry', 'OpenCV', 'Robotics'], links: [],
      compare: { title: 'Physical strip vs triangulated markers', a: 'old-mobius-a', al: 'Marker strip', b: 'old-mobius-points', bl: 'Triangulated', ratio: '16 / 10' },
      images: [
        ['old-mobius-a', 'Marker-patterned Möbius strip'],
        ['old-mobius-robot-sim', 'KUKA stereo-capture simulation with the camera rig'],
        ['old-mobius-robot-poses', 'Robot capture poses around the strip'],
        ['old-mobius-points', 'Triangulated marker cloud'],
        ['old-mobius-b', 'The strip from a second view'],
      ] },

    // ================= B · Sensing & Heritage =================
    {
      "slug": "kuppam-gpr",
      "section": "B",
      "year": "2026",
      "feature": true,
      "isNew": true,
      "video": true,
      "kicker": "New · Independent pilot · open research",
      "title": "Kuppam GPR Fracture Study",
      "sub": "From ground-penetrating radar to a straight-cut block plan in a black granite quarry",
      "meta": [
        "Near Kuppam, Andhra Pradesh",
        "Aug-Sep 2026 · three benches",
        "GPL-3.0 · dataset DOI"
      ],
      "lead": "One crack in the wrong place turns a twenty-tonne block into road metal, so look under the floor before the first cut.",
      "body": "In August 2026 I commissioned an independent pilot: ground-penetrating radar over three benches of a black granite (dolerite) quarry near Kuppam, 89 lines walked by PARSAN Overseas with two antennas on a painted 0.5 m grid.\nI re-tracked six fracture surfaces from the raw records (14,315 picks), registered them onto photogrammetry of the same benches, and planned straight wire cuts that keep 15 cm clear of every surface: 42 blocks, 177 m³, 524 t, and 113 pieces not worth cutting, known before the first cut. Model, code and dataset are open under GPL-3.0.",
      "contrib": [
        "Re-picked six fracture surfaces from the raw radar records: 14,315 picks, a crossing-line adjustment on the deep cap, and an uncertainty band on every surface.",
        "Registered each survey grid onto photogrammetry of its bench from the painted 0.5 m grid alone, and checked it by drawing the model back into the site photographs.",
        "Wrote the straight-cut block planner (15 cm clearance, cutting order, Monte Carlo risk per block) and the bilingual browser viewer for mason, owner and geologist."
      ],
      "tags": [
        "Ground-penetrating radar",
        "Photogrammetry",
        "Python",
        "Three.js",
        "Block planning",
        "Uncertainty"
      ],
      "links": [
        {
          "label": "Live 3D model",
          "url": "https://libishm1.github.io/Kuppam_granite-deposit_GPR-Fracture_study/"
        },
        {
          "label": "Pit view",
          "url": "https://libishm1.github.io/Kuppam_granite-deposit_GPR-Fracture_study/site.html"
        },
        {
          "label": "Dataset DOI",
          "url": "https://doi.org/10.6084/m9.figshare.33690616"
        },
        {
          "label": "Code",
          "url": "https://github.com/libishm1/Kuppam_granite-deposit_GPR-Fracture_study"
        },
        {
          "label": "Method preprint",
          "url": "https://doi.org/10.21203/rs.3.rs-10035624/v1"
        }
      ],
      "metrics": [
        {
          "v": "89",
          "k": "GPR lines"
        },
        {
          "v": "14,315",
          "k": "radar picks re-tracked"
        },
        {
          "v": "6",
          "k": "fracture surfaces"
        },
        {
          "v": "42",
          "k": "blocks · 177 m³"
        }
      ],
      "credits": "Survey and interpretation: PARSAN Overseas (Dr Sanjay Rana, Ronak Dahiya) · Re-picking, model and plan: Libish Murugesan",
      "cover": "kuppam-blocks",
      "steps": {
        "title": "From radar line to cut plan",
        "items": [
          [
            "kuppam-bench-lines",
            "89 lines walked"
          ],
          [
            "kuppam-radargram",
            "One section, picked"
          ],
          [
            "kuppam-picks-in-pit",
            "Picks stood up"
          ],
          [
            "kuppam-six-surfaces",
            "Six fracture surfaces"
          ],
          [
            "kuppam-blocks",
            "Blocks between cracks"
          ],
          [
            "kuppam-wire-cuts",
            "164 straight cuts"
          ]
        ]
      },
      "images": [
        [
          "kuppam-viewer",
          "The live viewer: the photographed bench on its painted grid, the radar surfaces, and one raw line with its picks. Roles for mason, owner and geologist, in English or Tamil.",
          {
            "title": "The bench model in the browser",
            "wide": true
          }
        ],
        [
          "kuppam-bench-lines",
          "Every radar line walked, drawn on the photogrammetry of the three benches: 89 lines, 612 m, two antennas, a trace every 2.5 cm. Frame from the film.",
          {
            "title": "89 lines on three benches"
          }
        ],
        [
          "kuppam-radargram",
          "Block C, line 20, low-frequency antenna: a shallow sheet (C-1) near the surface and a flat cap about three metres down (C-2), picked trace by trace. Frame from the film.",
          {
            "title": "One section, as recorded"
          }
        ],
        [
          "kuppam-picks-in-pit",
          "The deep cap under Block C, picked on all 32 lines that cross it (9,481 picks) and stood up where it was recorded. Frame from the film.",
          {
            "title": "One surface from 32 lines"
          }
        ],
        [
          "kuppam-six-surfaces",
          "The six radar surfaces under the three benches, from 0.2 m to about 4 m deep; depth error runs from 8 cm on the shallow sheets to 22 cm on the deep ones. Frame from the film.",
          {
            "title": "Six fracture surfaces"
          }
        ],
        [
          "kuppam-blocks",
          "Candidate blocks placed where the surfaces are not, each kept 15 cm clear of every surface above and below it. Frame from the film.",
          {
            "title": "Blocks between the cracks"
          }
        ],
        [
          "kuppam-wire-cuts",
          "A diamond wire cuts one straight plane at a time, so the plan uses straight through-cuts only: 164 of them, in cutting order, across the three benches. Frame from the film.",
          {
            "title": "164 straight cuts"
          }
        ],
        [
          "kuppam-registration",
          "Block B in plan on its photogrammetry, with the survey grid (yellow) and the depth contours of both surfaces. No markers or GPS: the painted 0.5 m grid gave scale, rotation and position.",
          {
            "title": "Registered onto photogrammetry"
          }
        ],
        [
          "kuppam-reprojection",
          "The registered grid and the crew's chalked cracks drawn back into a site photograph of Block C, the check every registration had to pass.",
          {
            "title": "Checked against the photographs"
          }
        ],
        [
          "kuppam-stereonet",
          "Poles to the six picked surfaces, equal-area lower hemisphere: near-flat sheets on B and C, the two A sheets dipping about 30 degrees to the south.",
          {
            "title": "Which way they lean",
            "wide": true,
            "contain": true
          }
        ]
      ]
    },

    { slug: 'drone-labyrinths', section: 'B', year: '2025',
      kicker: 'Independent Research · Caerdroia 54 (2025)', title: 'Drone Photogrammetry of Stone Labyrinths', sub: 'Full-arc drone video to textured mesh - Salem, Tamil Nadu',
      meta: ['2025', 'Photogrammetry', 'Heritage'],
      lead: 'An open-source pipeline turning a single arc of drone video into a fabricable textured mesh.',
      body: 'Documenting twin large-scale stone labyrinths in Salem - estimated at over 1,200 years old. The fully open-source workflow runs end-to-end in Google Colab: FFmpeg frame extraction, COLMAP structure-from-motion and dense stereo, then Open3D Poisson meshing with nearest-neighbour colour transfer.\nOutputs are vertex-coloured PLY meshes and 3D-printable STL derivatives, cleaned in Rhino 8 - prioritising transparency and reproducibility over speed.',
      contrib: ['Reproducible Colab pipeline: FFmpeg → COLMAP → Open3D', 'Textured PLY + print-ready STL for heritage documentation', 'Published archaeological documentation, Caerdroia 54'],
      tags: ['COLMAP', 'Open3D', 'FFmpeg', 'Rhino 8'], links: [{ label: 'Caerdroia 54 (PDF)', url: 'https://labyrinthos.net/Caerdroia54HR.pdf' }, { label: 'Code', url: 'https://github.com/libishm1/Colmap_Photogrammetry_Drone_video' }],
      metrics: [{ v: '1200+', k: 'years old' }, { v: '2 FPS', k: 'frame extraction' }, { v: 'Poisson', k: 'surface meshing' }, { v: 'PLY · STL', k: 'outputs' }],
      images: [
        ['d-labyrinth', 'Stone labyrinth from the drone arc', { wide: true }],
        ['d-labyrinth-print', '3D print of the reconstructed labyrinth'],
      ] },

    { slug: 'motif-depth', section: 'B', year: '2025',
      kicker: 'Heritage AI · Zenodo datasets', title: 'Temple Motif Depth Reconstruction', sub: 'Monocular depth of Tamil bas-relief motifs with Depth Anything 3',
      meta: ['2025', 'Monocular depth', 'Tamil Nadu'],
      lead: 'Recovering carveable 3D from single photographs of temple bas-relief motifs.',
      body: 'An interactive CLI reconstructs relief geometry from monocular images of Thanjavur, Erode and Namakkal temple motifs using Depth Anything 3. A live preview lets the user tune depth, mask and smoothing, then export watertight STL for study or fabrication.\nThe project ships a 35-panel validated mesh corpus and a motif glossary documenting iconography in Tamil traditions - released openly for conservation and research.',
      contrib: ['Interactive monocular-depth-to-STL reconstruction CLI', '35-panel validated mesh corpus (Zenodo)', 'Open motif glossary + iconographic documentation'],
      tags: ['Depth Anything 3', 'Open3D', 'STL', 'Heritage'], links: [{ label: 'Mesh corpus · Zenodo', url: 'https://doi.org/10.5281/zenodo.19846595' }, { label: 'Code', url: 'https://github.com/libishm1/Depth_Anything_3_Motifs_CLI' }],
      images: [
        ['d-motif-mesh', 'Thanjavur bas-relief motif · recovered relief mesh'],
        ['d-motif-panels', 'Original, raw depth, mask and smooth depth', { wide: true, contain: true }],
        ['d-motif-depth', 'Photograph and smoothed depth field', { contain: true }],
      ] },

    { slug: 'icp-registration', section: 'B', year: '2023',
      kicker: 'Reconstruction · Open3D', title: 'Semi-automatic ICP Registration', sub: 'Comparing photogrammetric methods via coarse + fine alignment',
      meta: ['2023', 'Registration', 'Open3D'],
      lead: 'A compact tool to register and compare meshes from different photogrammetric methods.',
      body: 'The script benchmarks photogrammetry outputs by aligning them with a two-stage registration: a coarse global alignment followed by fine ICP refinement in Open3D. It gives a repeatable way to quantify how reconstruction methods diverge on the same subject.\nBuilt to support the broader heritage-reconstruction work - keeping scan comparison honest and measurable.',
      contrib: ['Coarse-to-fine ICP registration of photogrammetric meshes', 'Quantitative comparison across reconstruction methods', 'Lightweight, reproducible Open3D workflow'],
      tags: ['ICP', 'Open3D', 'Point cloud', 'Registration'], links: [{ label: 'Code', url: 'https://github.com/libishm1/Semi_automatic_ICP_open3D' }],
      metrics: [{ v: '2-stage', k: 'coarse + fine' }, { v: 'ICP', k: 'fine alignment' }, { v: 'Open3D', k: 'engine' }, { v: 'mesh ↔ PCD', k: 'comparison' }],
      images: [['d-icp', 'Registered photogrammetric meshes, deviation in colour', { contain: true }]] },

    { slug: 'thermal-sensing', section: 'B', year: '2021', robot: true,
      kicker: 'Studio 2.2 · MRAC', title: 'Multispectral Thermal Sensing', sub: 'Thermal point-cloud acquisition with mobile robots & drones',
      meta: ['2021', 'Thermal + depth', 'ROS'],
      lead: 'Mapping the thermal environment of buildings by fusing thermal, RGB and depth onto point clouds.',
      body: 'A mobile robot carries thermal, RGB and depth cameras, registering thermal imagery into depth frames through a chain of ROS packages and OpenCV. A TurtleBot tunes capture parameters before deployment on autonomous vehicles.\nThe system builds and saves the environment via gmapping for 2D navigation, while reprojecting thermal data into other camera frames to assemble coloured thermal point clouds.',
      contrib: ['Thermal–depth registration and reprojection pipeline', 'ROS bring-up, gmapping and autonomous 2D navigation', 'Assembled coloured thermal point clouds of interiors'],
      tags: ['ROS', 'RealSense', 'Thermal', 'gmapping'], links: [],
      images: [
        ['old-thermal-room', 'Assembled thermal point cloud of a room'],
        ['old-thermal-cloud', 'Coloured thermal point cloud'],
        ['dx-page-10-3', 'Depth image from the capture rig'],
        ['dx-page-10-4', 'Thermal image, registered into the depth frame'],
      ] },

    // ================= C · Computational Tools =================
    { slug: 'frahan', section: 'C', year: '2024-26', feature: true, model: 'pendentive',
      kicker: 'Flagship · Rhino 8 / Grasshopper plugin', title: 'Frahan StonePack', sub: 'Stone-fabrication readiness for Rhino 8 / Grasshopper',
      meta: ["2024-26", "v0.1.2-alpha", "GPL-3.0"],
      lead: 'A production plugin that brings non-standard stone fabrication into the parametric workflow.',
      body: "Frahan StonePack turns the research on stone packing, scanning and robotic fabrication into a Rhino 8 / Grasshopper toolkit. 275 components in 20 families follow a nine-stage pipeline - from scan and GPR ingest and fracture mapping, through reconstruction, fracture networks, block cutting and 2D nesting, to masonry assembly, reassembly and fabrication export.\nThe same toolkit packs, nests and matches irregular stones into rubble and ashlar walls, voussoir arches and form-found vaults such as a Park Güell-inspired barrel, then checks each assembly for compression-only stability before exporting cut plans, robot frames or IFC. Every component is source-cited and wired into a live connection graph; the algorithm core is machine-checked in Lean 4.",
      contrib: ["275 components in 20 families across a nine-stage stone pipeline", "Quarry to building: GPR fractures, block cutting, nesting, masonry, IFC and robot export", "Compression-only stability checks (Güell barrel: 452 blocks, 841 interfaces, zero tension)"],
      tags: ['Rhino 8', 'Grasshopper', 'C# / Python', 'Stone fabrication'], links: [{ label: 'GitHub', url: 'https://github.com/libishm1/Frahan' }, { label: 'Zenodo DOI', url: 'https://doi.org/10.5281/zenodo.21209689' }, { label: 'Method preprint', url: 'https://doi.org/10.21203/rs.3.rs-10035624/v1' }],
      metrics: [{"v": "275", "k": "components"}, {"v": "9", "k": "pipeline stages"}, {"v": "52", "k": "worked examples"}, {"v": "151", "k": "graph edges"}],
      steps: {"title": "Quarry to building", "items": [["frahan-dfn-quarry-bench", "Fracture network in the bench"], ["frahan-fracture-block-packing", "Blocks packed around fractures"], ["frahan-bedding-aligned-blocks", "Bedding-aligned wire-saw blocks"], ["frahan-quarry-to-slabs", "Blocks cut to slabs"], ["frahan-castle-keep", "Stones assembled, exported to IFC"]]},
      images: [["frahan-guell-portico-interior", "Inside the Park Güell-inspired portico: irregular rubble stones skin the form-found barrel vault as it sweeps into the leaning colonnade.", {"title": "Güell portico, interior", "wide": true}], ["frahan-guell-rubble-vault", "Close-up of the Güell rubble vault: irregular stones fitted cell by cell over a thrust-following quad remesh of the funicular shell.", {"title": "Güell rubble vault skin"}], ["frahan-pendentive-vault", "A pendentive (sail) vault of 36 voussoirs, each trimmed from a matched rubble boulder · 98.3% of the shell volume recovered from real stone.", {"title": "Pendentive vault from rubble"}], ["frahan-guell-barrel-cra", "The Güell barrel vault as a 452-block, 841-interface rigid-block assembly, certified compression-only stable with zero tension (blue = supports).", {"title": "Güell barrel, certified stable"}], ["frahan-rubble-voussoir-arch", "An 11-voussoir semicircular arch (4.0 m span) where every voussoir is trimmed from a real scanned rubble stone · 94.9% coverage.", {"title": "Rubble voussoir arch"}], ["frahan-voronoi-block-wall", "Fifty polyhedral stones in a 3D Voronoi wall, coloured by the install order recovered from shared-face adjacency (blue set first, red set last).", {"title": "3D Voronoi block wall"}], ["frahan-dry-stone-wall-nbo", "A next-best-object planner builds straight and curved dry-stone walls from scanned stones, choosing the best stone and pose at each step · coloured by course.", {"title": "Next-best-object dry-stone walls"}], ["frahan-stone-wall-robot-frames", "Robot handoff for a dry-stone wall: each placed stone carries a place frame for a UR arm, with a force-seat URScript program generated per stone (simulation only).", {"title": "Stone wall to robot frames"}], ["frahan-castle-portal", "Portal of the castle keep: a 9-voussoir arch fills an opening cut through the generated wall stones, with masonry continuing over the extrados.", {"title": "Castle portal detail"}], ["frahan-trencadis-twist", "A 176-shard trencadís mosaic mapped onto a twisted monument after automatic angle-based surface segmentation.", {"title": "Trencadís on a twisted block"}], ["frahan-statue-to-blocks", "A 3 m sculpture split into 0.5 m blocks: boundary blocks (red) keep the real carved surface, interior blocks (blue) are plain stock.", {"title": "Sculpture to stone blocks"}], ["frahan-dfn-quarry-bench", "A discrete fracture network generated from scanned joint sets and clipped to a quarry bench, the input to block-cut yield optimisation.", {"title": "Fracture network in a quarry bench"}], ["frahan-fracture-block-packing", "Wire-saw block packing in a fractured quarry bench: intact, saw-separable blocks are recovered around the mapped fracture surfaces.", {"title": "Fracture-aware block packing"}], ["frahan-bedding-aligned-blocks", "Wire-saw blocks from the GPR cross-lithology study, rotated in plan to follow the bedding direction (red arrow = dip azimuth) while staying plumb for the saw.", {"title": "Bedding-aligned wire-saw blocks"}], ["frahan-quarry-to-slabs", "Quarry to slab: 60 fracture-free dimension blocks gang-sawn into 888 slabs of 20 mm, a 37.3% end-to-end volume yield.", {"title": "Quarry block to slabs"}], ["frahan-castle-keep", "A small castle keep composed on the Grasshopper canvas: polygonal rubble walls, an arched portal and a pendentive dome, checked stable and exported as one IFC4 model.", {"title": "Castle keep to IFC"}], ["d-frahan-nest2d", "2D packing of irregular slabs", {}], ["d-frahan-costing", "Block → slab → facade, costed", {"wide": true, "contain": true}]] },

    { slug: 'topologic-studio', section: 'C', year: '2025',
      kicker: 'Research Prototype · live demo', title: 'Topologic Studio', sub: 'Browser-native IFC fire-egress simulation',
      meta: ['2025', 'IFC · graphs', 'Web app'],
      lead: 'Turning any IFC building into a navigable spatial graph for hazard-aware evacuation.',
      body: 'IFC models are parsed in-browser with web-ifc; floors, stairs and doors become a navigation graph across all levels. A wall-aware Dijkstra computes egress paths, while a temperature-diffusion model streams fire spread over Server-Sent Events and re-routes the path live as the thermal field evolves.\nBuilt on TopologicPy with a React / Three.js front-end and FastAPI back-end; a tabular Q-learning agent learns escape routes under dynamic fire.',
      contrib: ['In-browser IFC → spatial navigation graph', 'Hazard-weighted dynamic re-routing streamed over SSE', 'Q-learning egress agent under evolving fire'],
      tags: ['TopologicPy', 'web-ifc', 'Three.js', 'FastAPI'], links: [{ label: 'Live demo', url: 'https://libishm1.github.io/Topologic_Studio/' }, { label: 'Code', url: 'https://github.com/libishm1/Topologic_Studio' }],
      metrics: [{ v: '1,866', k: 'graph nodes' }, { v: '1,552', k: 'edges' }, { v: 'SSE', k: 'live fire stream' }, { v: 'Q-learning', k: 'RL egress' }],
      images: [['d-topologic', 'IFC-native graph generation, fire diffusion and adaptive routing', { wide: true }]] },

    { slug: 'ur10e-stacking', section: 'C', year: '2025', robot: true,
      kicker: 'Robotics · ROS 2 Humble', title: 'UR10e + RG6 Robotic Stacking', sub: 'Pick-and-place stack on ROS 2 + MoveIt 2 (WSL2)',
      meta: ['2025', 'ROS 2 · MoveIt 2', 'Pick-place'],
      lead: 'A reproducible UR10e + OnRobot RG6 pick-and-place stack, simulation to real hardware.',
      body: 'An 80-waypoint pick-and-place program runs on ROS 2 Humble and MoveIt 2, in WSL2 on Windows, with visualised box stacking. One-shot launcher scripts manage the full lifecycle - sim, real arm, and an RS-485 Modbus bridge to the RG6 gripper.\nVendor packages are pinned by commit and bootstrapped with vcs import; a self-contained Docker image rebuilds the whole workspace, with a Grasshopper bridge on the Windows side.',
      contrib: ['UR10e + RG6 MoveIt 2 config, SRDF, controllers, launch', 'RS-485 Modbus gripper bridge + operator scripts', 'Reproducible Docker workspace + Grasshopper bridge'],
      tags: ['ROS 2', 'MoveIt 2', 'UR10e', 'Docker', 'WSL2'], links: [{ label: 'Code', url: 'https://github.com/libishm1/UR-10e_RG6_stacking_ROS2_wsl_gh' }],
      metrics: [{ v: '80', k: 'waypoints' }, { v: '2', k: 'control strategies' }, { v: 'RS-485', k: 'gripper bridge' }, { v: 'Docker', k: 'one-shot stack' }],
      compare: { title: 'Simulation vs real UR10e', a: 'd-ur-stacking', al: 'Simulation', b: 'd-ur-real', bl: 'Real · UR10e', ratio: '1 / 1' },
      images: [['d-ur-real', 'Real UR10e with the OnRobot RG6 stacking blocks'], ['d-ur-stacking', 'MoveIt 2 simulation of the stacking program']] },

    { slug: 'pointing-machine', section: 'C', year: '2024',
      kicker: 'Digital Fabrication · PWA', title: 'Digital Pointing Machine', sub: 'A sculptor’s pointing machine, reimagined for digital stock',
      meta: ['2024', 'Three.js · BVH', 'Carving'],
      lead: 'Bridging digital maquettes and physical stone/wood carving with millimetre-accurate point transfer.',
      body: 'A web app reimplements the traditional sculptor’s pointing machine. It wraps a high-resolution scan in a user-defined stock block, then - on any click - shoots a ray to the block surface and returns the exact perpendicular drill depth, rendering start, end and path.\nBuilt with React Three Fiber and three-mesh-bvh for exact raycasting on dense geometry; a clipping plane simulates roughing passes. Ships as an installable, offline PWA.',
      contrib: ['BVH-accelerated exact raycasting for point transfer', 'Automatic stock-block sizing with margin / kerf', 'Clipping-plane carving-stage simulation · offline PWA'],
      tags: ['React Three Fiber', 'three-mesh-bvh', 'STL · 3DM', 'PWA'], links: [{ label: 'Open the app', url: 'https://libishm1.github.io/Digital_pointing_machine/' }, { label: 'Code', url: 'https://github.com/libishm1/Digital_pointing_machine' }],
      metrics: [{ v: 'mm', k: 'point accuracy' }, { v: 'BVH', k: 'exact raycast' }, { v: 'STL·OBJ·3DM', k: 'inputs' }, { v: 'PWA', k: 'offline install' }],
      images: [['d-pointing', 'Digital stock block, drill-depth rays and carving-stage clipping', { wide: true }]] },

    // ================= D · Architecture & Studio =================
    { slug: 'terrain-plotted', section: 'D', year: 'Professional', feature: true,
      kicker: 'Computational Design · Godrej Properties', title: 'Terrain-Driven Plotted Development', sub: 'Road-network generation and cut-and-fill optimisation on sloped terrain',
      meta: ['Professional', 'Grasshopper', 'Site / terrain'],
      lead: 'Solving plotted development on a sloped site - generating the road network and optimising plots to balance earthwork.',
      body: 'Surveyor contours are rebuilt into a TIN terrain mesh; a road-construction script lays out the network and grades each segment within walkable limits. A cut-and-fill optimisation then sets plot and road levels to balance earthwork, read against slope and watershed analysis.\nThe plotted generative layout was developed in parallel by senior colleagues; my role covered the terrain meshes, roads, grading and earthwork-balancing scripts.',
      note: 'Site data is redacted for privacy.',
      contrib: ['TIN terrain meshes reconstructed from surveyor contours', 'Road construction with per-segment slope grading (1:11 - 1:66)', 'Cut-and-fill optimisation balancing earthwork vs. slope & watershed'],
      tags: ['Grasshopper', 'TIN / mesh', 'Slope analysis', 'Watershed', 'Cut & fill'], links: [],
      images: [
        ['d-gp-roadslope', 'Buildability analysis · road grades 1:11 - 1:66', { wide: true, contain: true }],
        ['d-gp-tin', 'TIN terrain with roads and plots', { contain: true }],
        ['d-gp-slope', 'Buildability on slope', { contain: true }],
        ['d-gp-cutfill', 'Buildability · built area (m²)', { contain: true }],
      ] },

    { slug: 'metal-cloud', section: 'D', year: '2020',
      kicker: 'Folds Design Studio · with SRI Design Lab', title: 'Metal Cloud', sub: 'An auxetic metal pavilion formed as fabric',
      meta: ['2020', 'Auxetic', 'Pavilion'],
      lead: 'Achieving a determined form with minimal material by letting sheet metal behave like fabric.',
      body: 'An exploration of architecture from a manufacturing perspective: minimal material, robotic CNC and hands-on fabrication intersecting in a single architectural element. An auxetic pattern lets the metal expand and drape, taking on folded volumes whose rigidity varies with thickness.\nIn-plane expansion of the chosen pattern is estimated through physics simulation; the final pavilion is partly shaped by gravity and artistic hammering.',
      contrib: ['Auxetic-pattern material simulation (in-plane expansion)', 'Minimal-material form-finding for a draped metal shell', 'Programmed CNC + hand-finishing fabrication'],
      tags: ['Auxetics', 'Physics sim', 'Robotic CNC', 'Sheet metal'], links: [],
      compare: { title: 'Form-found mesh vs installed canopy', a: 'old-metal-wire-model', al: 'Simulated', b: 'old-metal-installed', bl: 'Installed', ratio: '16 / 9' },
      images: [
        ['old-metal-installed', 'Metal Cloud installed, draped by gravity and hammering'],
        ['old-metal-auxetic-close', 'Auxetic cuts opening as the sheet drapes', { wide: true }],
        ['old-metal-wire-model', 'Form-found canopy mesh'],
        ['old-metal-canopy-night', 'The canopy lit at night'],
        ['old-metal-pattern', 'Auxetic pattern from below'],
        ['old-metal-bowl', 'Auxetic sample shell'],
        ['old-metal-expo', 'The pavilion at the exhibition'],
      ] },

    { slug: 'building-for-a-billion', section: 'D', year: '2018',
      kicker: 'FHD Group · computational design', title: 'Building for a Billion', sub: 'Incremental low-cost housing via multi-objective optimisation',
      meta: ['2018', 'Optimisation', 'Housing'],
      lead: 'Redefining low-cost housing through incremental modules and user-defined communes.',
      body: 'User priorities drive a bottom-up design: incremental modules are authored for four household typologies, then aggregated into communes. A multi-objective optimisation maximises the number of modules while minimising incident surface radiation and maximising social space (isovists).\nThe aggregation of modules defines the planning of the entire settlement, generating commune variants tuned to occupancy and climate.',
      contrib: ['Typology-driven incremental housing modules', 'Multi-objective optimisation (radiation, isovists, count)', 'Settlement-scale aggregation into communes'],
      tags: ['Multi-objective', 'Isovists', 'Radiation', 'Generative'], links: [],
      images: [
        ['old-b4b-street', 'Commune street render'],
        ['old-b4b-plan', 'Settlement master plan'],
        ['old-b4b-generations', 'Commune generations from the optimisation'],
        ['old-b4b-radiation', 'Radiation analysis of commune variants', { contain: true }],
      ] },
  ],

  // Selected studio work (lightbox galleries)
  studio: [
    { title: 'Bamboo Pavilion', sub: 'FHD, 2019 · anticlastic shelter, traditional joinery', images: [['old-bamboo-render', 'Pool-deck shelter render'], ['old-bamboo-model-a', 'Anticlastic study model'], ['old-bamboo-model-b', 'Shelter model'], ['old-bamboo-sections', 'Sections: rope-knot joints for a traditional workforce']] },
    { title: 'Pandemic Prototyping', sub: '2020 · scissor-joint structures, 3D-printed PPE', images: [['old-proto-hoberman-b', 'Transformable icosidodecahedron, expanded'], ['old-proto-hoberman-a', 'Scissor-joint sphere, collapsed'], ['old-proto-alu-unit', 'Aluminium pavilion unit'], ['old-proto-unfold', 'Faces grouped and unrolled with graph theory'], ['old-proto-mask-cad', 'Mask with a replaceable HEPA filter'], ['old-proto-mask-print', '3D-printed mask']] },
    { title: 'Chatras · Landscape', sub: '2018 · deployable origami shading, daylight analysis', images: [['old-chatras-origami', 'Deployable origami shades with radial actuators'], ['old-chatras-sketch', 'Shade canopy sketch']] },
    { title: 'Exploratorium', sub: '2019 · new-media museum, kinetic ceiling', images: [['old-explo-projection', 'Experience centre augmented with projection'], ['old-explo-kinetic', 'Kinetic ceiling'], ['old-explo-print', 'Atrium structure study']] },
    { title: 'Bhavan · Hotel', sub: '2017 · algorithmic river-view facade optimisation', images: [['old-bhavan-facade', 'Optimised river-view facade'], ['old-bhavan-model', 'Hotel massing with the facade screen']] },
    { title: 'Sensing the Thermal Env.', sub: 'MRAC · schlieren imaging + urban CFD', images: [['old-thermal-schlieren', 'Schlieren imaging of hot air around an object'], ['old-thermal-hog', 'Flow field from optical flow and HOG'], ['old-thermal-cfd', 'Urban CFD thermal-comfort mapping']] },
    { title: 'Plant-D Rover', sub: 'MRAC · ROS plant-health detection & mapping', images: [['old-plantd-detect', 'Plant status detection on the rover camera feed'], ['old-plantd-rover', 'Mapping run over the plant field']] },
    { title: 'Urban Rejuvenation', sub: '2019 · transit-centre public intervention', images: [['old-urban-concourse', 'Transit concourse']] },
    { title: 'Mixed Use · Amaravati', sub: '2018 · the residential street as landscape', images: [['old-amaravati-model', 'The residential street, study model']] },
  ],

  // Frahan gallery + 3D models: filled from the Frahan repo
  stoneIntro: "Frahan StonePack is an open-source Rhino 8 and Grasshopper plugin that takes stone from the ground to the building. It reads ground-penetrating radar and 3D scans, maps fractures and joint sets, and plans how a fractured quarry can be cut into sound blocks and slabs. The same toolkit packs, nests and matches irregular stones into rubble and ashlar walls, carved voussoir arches and form-found vaults such as a Park Güell-inspired barrel, then checks each assembly for compression-only stability before exporting cut plans, robot frames or IFC models. It ships 275 Grasshopper components in 20 families, 52 worked examples and a formally verified algorithm core, released under GPL-3.0 as a research preview.",
  stone: [["frahan-guell-portico-interior", "Inside the Park Güell-inspired portico: irregular rubble stones skin the form-found barrel vault as it sweeps into the leaning colonnade.", {"title": "Güell portico, interior"}], ["frahan-guell-rubble-vault", "Close-up of the Güell rubble vault: irregular stones fitted cell by cell over a thrust-following quad remesh of the funicular shell.", {"title": "Güell rubble vault skin"}], ["frahan-fracture-block-packing", "Wire-saw block packing in a fractured quarry bench: intact, saw-separable blocks are recovered around the mapped fracture surfaces.", {"title": "Fracture-aware block packing"}], ["frahan-pendentive-vault", "A pendentive (sail) vault of 36 voussoirs, each trimmed from a matched rubble boulder · 98.3% of the shell volume recovered from real stone.", {"title": "Pendentive vault from rubble"}], ["frahan-castle-keep", "A small castle keep composed on the Grasshopper canvas: polygonal rubble walls, an arched portal and a pendentive dome, checked stable and exported as one IFC4 model.", {"title": "Castle keep to IFC"}], ["frahan-voronoi-block-wall", "Fifty polyhedral stones in a 3D Voronoi wall, coloured by the install order recovered from shared-face adjacency (blue set first, red set last).", {"title": "3D Voronoi block wall"}], ["frahan-dry-stone-wall-nbo", "A next-best-object planner builds straight and curved dry-stone walls from scanned stones, choosing the best stone and pose at each step · coloured by course.", {"title": "Next-best-object dry-stone walls"}], ["frahan-dfn-quarry-bench", "A discrete fracture network generated from scanned joint sets and clipped to a quarry bench, the input to block-cut yield optimisation.", {"title": "Fracture network in a quarry bench"}], ["frahan-rubble-voussoir-arch", "An 11-voussoir semicircular arch (4.0 m span) where every voussoir is trimmed from a real scanned rubble stone · 94.9% coverage.", {"title": "Rubble voussoir arch"}], ["frahan-guell-barrel-cra", "The Güell barrel vault as a 452-block, 841-interface rigid-block assembly, certified compression-only stable with zero tension (blue = supports).", {"title": "Güell barrel, certified stable"}], ["frahan-castle-portal", "Portal of the castle keep: a 9-voussoir arch fills an opening cut through the generated wall stones, with masonry continuing over the extrados.", {"title": "Castle portal detail"}], ["frahan-stone-wall-robot-frames", "Robot handoff for a dry-stone wall: each placed stone carries a place frame for a UR arm, with a force-seat URScript program generated per stone (simulation only).", {"title": "Stone wall to robot frames"}], ["frahan-oblique-marble-blocks", "Marble blocks sheared to ride GPR-kriged bed surfaces, so each block follows the bed dip and never crosses a fracture.", {"title": "Dip-following marble blocks"}], ["frahan-bedding-aligned-blocks", "Wire-saw blocks from the GPR cross-lithology study, rotated in plan to follow the bedding direction (red arrow = dip azimuth) while staying plumb for the saw.", {"title": "Bedding-aligned wire-saw blocks"}], ["frahan-pendentive-voussoirs", "Cut-stone voussoirs of a pendentive vault, with bed joints following the sphere's lines of curvature for stable dry assembly.", {"title": "Pendentive vault voussoirs"}], ["frahan-quarry-to-slabs", "Quarry to slab: 60 fracture-free dimension blocks gang-sawn into 888 slabs of 20 mm, a 37.3% end-to-end volume yield.", {"title": "Quarry block to slabs"}], ["frahan-statue-to-blocks", "A 3 m sculpture split into 0.5 m blocks: boundary blocks (red) keep the real carved surface, interior blocks (blue) are plain stock.", {"title": "Sculpture to stone blocks"}], ["frahan-trencadis-twist", "A 176-shard trencadís mosaic mapped onto a twisted monument after automatic angle-based surface segmentation.", {"title": "Trencadís on a twisted block"}]],
  models: [{"id": "pendentive", "file": "models/frahan-pendentive-vault.glb", "title": "Pendentive vault", "sub": "36 voussoirs", "unit": "voussoirs", "desc": "A pendentive (sail) vault of 36 voussoirs, each trimmed from a scanned rubble boulder, on a 3.2 m square plan. Colours as in the repo.", "bytes": 336776, "camera": {"dir": [1, 0.42, 1.15], "dist": 1.95}, "bbox": "3.7 × 3.7 × 1.8 m"}, {"id": "guell", "recolor": true, "file": "models/frahan-guell-barrel-vault.glb", "title": "Güell barrel vault", "sub": "452 blocks · 16 m", "unit": "blocks", "desc": "The Park Güell-inspired barrel shell from the Frahan vault example, divided here into 452 blocks 0.28 m thick for viewing. The block outlines in this viewer are illustrative; the certified stable assembly (452 blocks, 841 interfaces, zero tension) is in the gallery below.", "bytes": 2545480, "camera": {"dir": [1, 0.3, 0.55], "dist": 0.95}, "bbox": "16.0 × 4.4 × 3.8 m"}, {"id": "castle", "recolor": true, "file": "models/frahan-castle-keep.glb", "title": "Castle keep", "sub": "125 stones · IFC", "unit": "stones", "desc": "The castle keep from the repo’s IFC4 export: four polygonal rubble walls, a 9-voussoir portal arch, tympanum infill and an 18-piece pendentive dome.", "bytes": 339884, "camera": {"dir": [0.9, 0.45, 1.25], "dist": 2.25}, "bbox": "6.1 × 6.1 × 5.6 m"}, {"id": "arch", "file": "models/frahan-rubble-voussoir-arch.glb", "title": "Rubble voussoir arch", "sub": "11 voussoirs · 4 m span", "unit": "voussoirs", "desc": "An 11-voussoir semicircular arch with a 4.0 m span, every voussoir trimmed from a real scanned rubble stone.", "bytes": 179724, "camera": {"dir": [0.35, 0.18, 1], "dist": 1.45}, "bbox": "5.1 × 0.6 × 2.5 m"}, {"id": "wall", "file": "models/frahan-rubble-wall.glb", "title": "Rubble masonry wall", "sub": "40 scanned stones", "unit": "stones", "desc": "Forty scanned dry-stones settled into a 10.2 m rubble wall by the Frahan rubble packer, each stone kept as scanned.", "recolor": true, "bytes": 2008324, "camera": {"dir": [0.28, 0.22, 1], "dist": 1.2}, "bbox": "10.2 × 1.2 × 3.9 m"}],

  pubs: [
    {
      "year": 2026,
      "type": "dataset",
      "title": "Kuppam dolerite benches: ground-penetrating radar fracture model, verification and block yield - pilot dataset",
      "authors": "Libish Murugesan",
      "venue": "figshare",
      "doi": "10.6084/m9.figshare.33690616",
      "url": "https://doi.org/10.6084/m9.figshare.33690616",
      "note": "GPR survey of three dolerite benches near Kuppam, re-processed into fracture surfaces, a block cutting plan and an uncertainty analysis (v3, GPL-3.0+).",
      "project": "kuppam-gpr"
    },
    {
      "year": 2026,
      "type": "software",
      "title": "Frahan StonePack",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.21209689",
      "url": "https://doi.org/10.5281/zenodo.21209689",
      "note": "Archived releases (v0.1.0 to v0.1.2 alpha) of the Rhino/Grasshopper plugin for stone fabrication, from GPR and scans to block packing (GPL-3.0).",
      "project": "frahan"
    },
    {
      "year": 2026,
      "type": "preprint",
      "title": "A managed, uncertainty-aware pipeline from ground-penetrating radar to dimension-stone block yield in fractured quarries",
      "authors": "Libish Murugesan",
      "venue": "Research Square",
      "doi": "10.21203/rs.3.rs-10035624/v1",
      "url": "https://www.researchsquare.com/article/rs-10035624/v1",
      "note": "Sole-author preprint that turns GPR fracture picks into 3D fracture surfaces and carries the uncertainty through to quarry block yield (CC BY 4.0, not yet peer reviewed).",
      "project": "frahan"
    },
    {
      "year": 2026,
      "type": "software",
      "title": "Reproducibility package for \"A managed, uncertainty-aware pipeline from ground-penetrating radar to dimension-stone block yield in fractured quarries\"",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.20608279",
      "url": "https://doi.org/10.5281/zenodo.20608279",
      "note": "Code, input geometry and results that regenerate every number and figure in the GPR block-yield preprint (files available on request).",
      "project": "frahan"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "gml-aec-knowledge-graph",
      "authors": "Abdulrahman Ahmed Alymani, Mohammed Alsofiani, Libish Murugesan, Ammar Alammar",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.20073214",
      "url": "https://doi.org/10.5281/zenodo.20073214",
      "note": "Knowledge graph and wiki of 112 papers on graph machine learning in architecture, engineering and construction, from a PRISMA 2020 review at Alfaisal University (files available on request).",
      "project": ""
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "3D Mesh Corpus: Tamil Temple Bas-Relief Motifs, 4 temples, Brihadeshwara, Rajagopalaswamy in Thanjavur, Narashimaswamy Namakal and Kulavilakkamman Temples, Kalamangalam (Depth_Anything_3_Motifs_CLI)",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19846595",
      "url": "https://doi.org/10.5281/zenodo.19846595",
      "note": "35 STL relief meshes from four Tamil Nadu temples, made from single smartphone photos with Depth Anything 3 and SAM.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "Motifs and Freize reliefs of the Narasimhaswamy Temple, Namakkal",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19469154",
      "url": "https://doi.org/10.5281/zenodo.19469154",
      "note": "Source photographs of carved motifs and friezes at the Narasimhaswamy Temple, Namakkal, used by the Depth Anything 3 motif pipeline.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "Motifs and Freize reliefs of the Kulavilakkaman temple in Kalamangalam, Erode",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19468980",
      "url": "https://doi.org/10.5281/zenodo.19468980",
      "note": "Source photographs of carved motifs and friezes at the Kulavilakkamman temple, Kalamangalam, used by the Depth Anything 3 motif pipeline.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "temple bas relief motifs in Thanjavur , Arulmigu Sri Rajagopalswamy Temple (1-11), Thanjai Periya Kovil (12-24)",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19455013",
      "url": "https://doi.org/10.5281/zenodo.19455013",
      "note": "Source photographs of bas-relief motifs at the Rajagopalaswamy and Brihadeeswara (Periya Kovil) temples in Thanjavur, used by the Depth Anything 3 motif pipeline.",
      "project": "motif-depth"
    },
    {
      "year": 2025,
      "type": "journal",
      "title": "Two Labyrinths Rediscovered in Salem, India",
      "authors": "Libish Murugesan",
      "venue": "Caerdroia 54 (Labyrinthos), pp. 44-45",
      "doi": "",
      "url": "https://labyrinthos.net/Caerdroia54HR.pdf",
      "note": "Field article on the two classical stone labyrinths (Ezhu Suthu Kottai) at Vembadithalam near Salem, Tamil Nadu; the issue is a free PDF.",
      "project": "drone-labyrinths"
    },
    {
      "year": 2022,
      "type": "conference",
      "title": "Programming Twist - Exploring the geometric affordances of aluminum through flexible robotic workflows",
      "authors": "Marielena Papandreou, Efilena Baseta, Arpan Mathe, Robert Michael Blackburn, Libish Murugesan",
      "venue": "eCAADe 2022, Ghent (Proceedings Vol. 2, pp. 399-408)",
      "doi": "10.52842/conf.ecaade.2022.2.399",
      "url": "https://papers.cumincad.org/cgi-bin/works/paper/ecaade2022_303",
      "note": "IAAC MRAC studio paper on folding and pressing flat aluminium strips into twisted forms with a small-payload robot.",
      "project": "crease-forming"
    }
  ],
  profiles: [{"label": "ORCID", "url": "https://orcid.org/0009-0004-3238-4202"}, {"label": "Zenodo", "url": "https://zenodo.org/search?q=metadata.creators.person_or_org.identifiers.identifier%3A%220009-0004-3238-4202%22"}, {"label": "GitHub", "url": "https://github.com/libishm1"}],
  orcid: '0009-0004-3238-4202',

  archivePlates: 23,
  archiveTitles: { 1: 'Cover', 2: 'Contents', 3: 'CCLT', 4: 'Log Pavilion', 5: 'Crease Forming', 6: 'Möbius strip', 7: 'Automated Spolia', 8: 'Spolia · geometry', 9: 'Spolia · motion', 10: 'Multispectral', 11: 'Lattice printing', 12: 'Plant-D', 13: 'Metal Cloud', 14: 'Metal Cloud · installed', 15: 'Building for a Billion', 16: 'Bhavan', 17: 'Urban Rejuvenation', 18: 'Amaravati', 19: 'Chatras', 20: 'Bamboo Pavilion', 21: 'Exploratorium', 22: 'Prototyping', 23: 'Thermal environment' },

  repos: [
    { name: 'Frahan', desc: 'Stone in computational design - Rhino 8 / Grasshopper stone-fabrication readiness plugin', url: 'https://github.com/libishm1/Frahan' },
    { name: 'Kuppam_granite-deposit_GPR', desc: 'Open GPR fracture model, verification and block yield of a black granite quarry', url: 'https://github.com/libishm1/Kuppam_granite-deposit_GPR-Fracture_study' },
    { name: 'Topologic_Studio', desc: 'Browser-native IFC fire-egress simulation (TopologicPy + Three.js + FastAPI)', url: 'https://github.com/libishm1/Topologic_Studio' },
    { name: 'Depth_Anything_3_Motifs_CLI', desc: 'Monocular depth reconstruction of Tamil temple bas-relief motifs', url: 'https://github.com/libishm1/Depth_Anything_3_Motifs_CLI' },
    { name: 'Colmap_Photogrammetry_Drone_video', desc: 'Open-source drone-video → textured mesh heritage pipeline', url: 'https://github.com/libishm1/Colmap_Photogrammetry_Drone_video' },
    { name: 'UR-10e_RG6_stacking_ROS2', desc: 'UR10e + OnRobot RG6 pick-and-place on ROS 2 + MoveIt 2 (WSL2)', url: 'https://github.com/libishm1/UR-10e_RG6_stacking_ROS2_wsl_gh' },
    { name: 'Digital_pointing_machine', desc: 'Digital sculptor’s pointing machine - React Three Fiber PWA', url: 'https://github.com/libishm1/Digital_pointing_machine' },
    { name: 'Semi_automatic_ICP_open3D', desc: 'Coarse-to-fine ICP comparison of photogrammetric methods', url: 'https://github.com/libishm1/Semi_automatic_ICP_open3D' },
    { name: 'ssik · bimascode · ifc-lite', desc: 'Analytical IK, BIM-as-code, and a WebGPU IFC viewer', url: 'https://github.com/libishm1?tab=repositories' },
  ],
};
