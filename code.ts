figma.showUI(__html__, { width: 381, height: 81 });

// Load FONTS
async function loadFonts() {
  await Promise.all([
    figma.loadFontAsync({
      family: "Arial",
      style: "Bold",
    }),
    figma.loadFontAsync({
      family: "Arial",
      style: "Regular",
    }),
  ]);
}

let data;

if (data) {
  figma.ui.postMessage({
    dataUrl: data.embedUrl,
    selection: figma.currentPage.selection,
  });
}

function isLoomEmbedNode(node: SceneNode) {
  return node.name.includes("Loom Video");
}

figma.root.setRelaunchData({ open: "" });

figma.on("selectionchange", () => {
  if (figma.currentPage.selection.length > 0) {
    for (const node of figma.currentPage.selection) {
      if (node.setRelaunchData && isLoomEmbedNode(node)) {
        node.setRelaunchData({
          relaunch: "",
        });
      }
    }
  }
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "view") {
    console.log("plugin hit view")
    const embeds = figma.currentPage.findChildren(
      (n) => n.name === "Loom Embed"
    );

    const embedsToSend = [];

    for (let i = 0; i < embeds.length; i++) {
      const img = embeds[i].children[0].fills;
      const title = embeds[i].children[1].characters;
      const location = { x: embeds[i].x, y: embeds[i].y };
      embedsToSend.push({ img, title, location });
    }
    figma.ui.postMessage({ type: "view", embeds: embedsToSend });
  }

  if (msg.type === "move") {
    figma.viewport.center = {
      x: msg.location.x + 272,
      y: msg.location.y + 204,
    };
  }

  if (msg.type === "create") {
    let shadow = figma
      .getLocalEffectStyles()
      .find((effect) => effect.name === "Shadows");

    if (!shadow) {
      shadow = figma.createEffectStyle();
      shadow.name = "Shadows";
      shadow.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.10000000149011612 },
          offset: { x: 0, y: 6 },
          radius: 24,
          spread: 0,
          visible: true,
          blendMode: "NORMAL",
          showShadowBehindNode: true,
        },
      ];
    }

    let darkOverlay = figma
      .getLocalPaintStyles()
      .find((effect) => effect.name === "DarkOverlay");

    if (!darkOverlay) {
      darkOverlay = figma.createPaintStyle();
      darkOverlay.name = "DarkOverlay";
      darkOverlay.paints = [
        {
          type: "SOLID",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          color: {
            r: 0.20000000298023224,
            g: 0.20000000298023224,
            b: 0.20000000298023224,
          },
        },
      ];
    }

    data = msg.data;
    let imageHash = figma.createImage(new Uint8Array(data.thumbnailHash)).hash;
    var parentFrame = figma.createFrame();
    parentFrame.effectStyleId = shadow.id;
    parentFrame.resize(571.0, 385.0);
    parentFrame.primaryAxisSizingMode = "AUTO";
    parentFrame.name = "▶️ Loom Video";
    parentFrame.relativeTransform = [
      [1, 0, 1004],
      [0, 1, -25],
    ];
    parentFrame.x = 1004;
    parentFrame.y = -25;
    parentFrame.strokes = [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.15000000596046448,
        blendMode: "NORMAL",
        color: { r: 0, g: 0, b: 0 },
      },
    ];
    parentFrame.cornerRadius = 6;
    parentFrame.backgrounds = [];
    parentFrame.expanded = false;
    figma.currentPage.appendChild(parentFrame);

    var thumbnail = figma.createRectangle();
    thumbnail.resize(701.9738769531, 406.1926574707);
    thumbnail.name = "Thumbnail";
    thumbnail.fills = [
      {
        type: "IMAGE",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        scaleMode: "FILL",
        imageTransform: [
          [1, 0, 0],
          [0, 1, 0],
        ],
        scalingFactor: 0.5,
        rotation: 0,
        filters: {
          exposure: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          tint: 0,
          highlights: 0,
          shadows: 0,
        },
        imageHash: imageHash,
      },
    ];
    thumbnail.constrainProportions = true;
    thumbnail.constraints = { horizontal: "SCALE", vertical: "SCALE" };
    parentFrame.appendChild(thumbnail);

    var overlayRect = figma.createRectangle();
    overlayRect.fillStyleId = darkOverlay.id;
    overlayRect.resize(571.0, 385.0);
    overlayRect.name = "Overlay";
    overlayRect.opacity = 0.15000000596046448;
    overlayRect.constraints = { horizontal: "STRETCH", vertical: "STRETCH" };
    parentFrame.appendChild(overlayRect);

    var centerButton = figma.createFrame();
    centerButton.resize(237.0, 64.0);
    centerButton.primaryAxisSizingMode = "AUTO";
    centerButton.counterAxisSizingMode = "AUTO";
    centerButton.name = "Watch video";
    centerButton.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.30000001192092896 },
        offset: { x: 0, y: 6 },
        radius: 24,
        spread: 0,
        visible: true,
        blendMode: "NORMAL",
        showShadowBehindNode: true,
      },
    ];
    centerButton.relativeTransform = [
      [1, 0, 167.5],
      [0, 1, 161],
    ];
    centerButton.x = 167.5;
    centerButton.y = 161;
    centerButton.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.3803921639919281,
          g: 0.3607843220233917,
          b: 0.9607843160629272,
        },
      },
    ];
    centerButton.strokes = [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.5,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    centerButton.strokeWeight = 5;
    centerButton.strokeAlign = "OUTSIDE";
    centerButton.cornerRadius = 2000;
    centerButton.paddingLeft = 24;
    centerButton.paddingRight = 24;
    centerButton.paddingTop = 16;
    centerButton.paddingBottom = 16;
    centerButton.primaryAxisAlignItems = "CENTER";
    centerButton.counterAxisAlignItems = "CENTER";
    centerButton.backgrounds = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 0.3803921639919281,
          g: 0.3607843220233917,
          b: 0.9607843160629272,
        },
      },
    ];
    centerButton.clipsContent = false;
    centerButton.expanded = false;
    centerButton.constraints = { horizontal: "CENTER", vertical: "CENTER" };
    centerButton.layoutMode = "HORIZONTAL";
    centerButton.counterAxisSizingMode = "AUTO";
    centerButton.itemSpacing = 8;
    parentFrame.appendChild(centerButton);

    var openIcon = figma.createFrame();
    openIcon.resize(32.0, 32.0);
    openIcon.primaryAxisSizingMode = "AUTO";
    openIcon.name = "Icon / ExternalLink";
    openIcon.relativeTransform = [
      [1, 0, 24],
      [0, 1, 16],
    ];
    openIcon.x = 24;
    openIcon.y = 16;
    openIcon.fills = [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    openIcon.backgrounds = [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    openIcon.expanded = false;
    centerButton.appendChild(openIcon);

    var buttonOutline = figma.createVector();
    buttonOutline.resize(23.9999675751, 23.9999752045);
    buttonOutline.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    buttonOutline.strokes = [];
    buttonOutline.strokeWeight = 2;
    buttonOutline.strokeJoin = "ROUND";
    buttonOutline.strokeCap = "ROUND";
    buttonOutline.relativeTransform = [
      [1, 0, 4],
      [0, 1, 4],
    ];
    buttonOutline.x = 4;
    buttonOutline.y = 4;
    buttonOutline.constraints = { horizontal: "SCALE", vertical: "SCALE" };
    buttonOutline.vectorNetwork = {
      regions: [
        {
          windingRule: "EVENODD",
          loops: [
            [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ],
          ],
        },
        {
          windingRule: "EVENODD",
          loops: [[24, 25, 26, 27, 28, 29, 30, 31, 32]],
        },
        { windingRule: "EVENODD", loops: [[33, 34, 35, 36, 37, 38]] },
      ],
      segments: [
        {
          start: 0,
          end: 1,
          tangentStart: { x: 0.19448217271387405, y: -0.19448201376814883 },
          tangentEnd: { x: -0.27503968013763563, y: 0 },
        },
        {
          start: 2,
          end: 0,
          tangentStart: { x: 0, y: -0.27503968013763336 },
          tangentEnd: { x: -0.19448201376815044, y: 0.19448217271387244 },
        },
        {
          start: 3,
          end: 2,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 4,
          end: 3,
          tangentStart: { x: -0.19448217271387405, y: -0.19448217271387244 },
          tangentEnd: { x: 0, y: 0.27503968013763336 },
        },
        {
          start: 5,
          end: 4,
          tangentStart: { x: -0.27503872646329397, y: 0 },
          tangentEnd: { x: 0.19448264955104488, y: 0.19448344427966133 },
        },
        {
          start: 6,
          end: 5,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 7,
          end: 6,
          tangentStart: { x: -0.19448217271387405, y: 0.19448344427966133 },
          tangentEnd: { x: 0.27503840857184675, y: 0 },
        },
        {
          start: 8,
          end: 7,
          tangentStart: { x: 0, y: 0.2750384085718445 },
          tangentEnd: { x: 0.19448344427966294, y: -0.19448217271387244 },
        },
        {
          start: 9,
          end: 8,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 10,
          end: 9,
          tangentStart: { x: -0.7363790071376165, y: 0 },
          tangentEnd: { x: 0, y: -0.7363796429205048 },
        },
        {
          start: 11,
          end: 10,
          tangentStart: { x: 0, y: -0.7363796429205048 },
          tangentEnd: { x: 0.7363802787034054, y: 0 },
        },
        {
          start: 12,
          end: 11,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 13,
          end: 12,
          tangentStart: { x: 0.6945775533935359, y: -0.694578824959319 },
          tangentEnd: { x: 0, y: 0.9822845719201191 },
        },
        {
          start: 14,
          end: 13,
          tangentStart: { x: 0.9822845719201273, y: 0 },
          tangentEnd: { x: -0.6945788249593248, y: 0.6945775533935301 },
        },
        {
          start: 15,
          end: 14,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 16,
          end: 15,
          tangentStart: { x: 0.6945788249593248, y: 0.694578824959319 },
          tangentEnd: { x: -0.9822839361372329, y: 0 },
        },
        {
          start: 17,
          end: 16,
          tangentStart: { x: 0, y: 0.9822833003543302 },
          tangentEnd: { x: -0.694579142850772, y: -0.6945800965251079 },
        },
        {
          start: 18,
          end: 17,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 19,
          end: 18,
          tangentStart: { x: -0.6945793017964956, y: 0.6945793812693516 },
          tangentEnd: { x: 0, y: -0.9822831414086066 },
        },
        {
          start: 20,
          end: 19,
          tangentStart: { x: -0.9822831414086147, y: 0 },
          tangentEnd: { x: 0.6945793812693575, y: -0.6945793017964899 },
        },
        {
          start: 21,
          end: 20,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 22,
          end: 21,
          tangentStart: { x: 0, y: -0.7363797223933666 },
          tangentEnd: { x: 0.736379642920511, y: 0 },
        },
        {
          start: 23,
          end: 22,
          tangentStart: { x: 0.736379642920511, y: 0 },
          tangentEnd: { x: 0, y: 0.7363797223933666 },
        },
        {
          start: 1,
          end: 23,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 24,
          end: 25,
          tangentStart: { x: -0.7363797223933728, y: 0 },
          tangentEnd: { x: 0, y: -0.7363797223933666 },
        },
        {
          start: 26,
          end: 24,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 27,
          end: 26,
          tangentStart: { x: 0, y: -0.7363797223933666 },
          tangentEnd: { x: 0.736379642920511, y: 0 },
        },
        {
          start: 28,
          end: 27,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 29,
          end: 28,
          tangentStart: { x: 0.736379642920511, y: 0 },
          tangentEnd: { x: 0, y: 0.7363796429205048 },
        },
        {
          start: 30,
          end: 29,
          tangentStart: { x: 0, y: 0.7363796429205048 },
          tangentEnd: { x: -0.736379642920511, y: 0 },
        },
        {
          start: 31,
          end: 30,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 32,
          end: 31,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 25,
          end: 32,
          tangentStart: { x: 0, y: 0.7363797223933666 },
          tangentEnd: { x: -0.7363797223933728, y: 0 },
        },
        {
          start: 33,
          end: 34,
          tangentStart: { x: 0.5206985611571011, y: -0.5206990379942676 },
          tangentEnd: { x: 0.5206985611571011, y: 0.5206990379942676 },
        },
        {
          start: 35,
          end: 33,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 36,
          end: 35,
          tangentStart: { x: 0.520699037994272, y: 0.5206985611570968 },
          tangentEnd: { x: -0.520699037994272, y: 0.5206985611570968 },
        },
        {
          start: 37,
          end: 36,
          tangentStart: { x: -0.5206991174671337, y: 0.5206985611570968 },
          tangentEnd: { x: -0.5206991174671337, y: -0.5206985611570968 },
        },
        {
          start: 38,
          end: 37,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 34,
          end: 38,
          tangentStart: { x: -0.5206985611571011, y: -0.5206991174671294 },
          tangentEnd: { x: 0.5206985611571011, y: -0.5206991174671294 },
        },
      ],
      vertices: [
        {
          x: 2.970407564650948,
          y: 6.525937571153226,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.70370397842484,
          y: 6.222196743811586,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 2.666666737309306,
          y: 7.259234302818558,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 2.666666737309306,
          y: 20.296272815500203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 2.970407564650948,
          y: 21.029568275599747,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.70370397842484,
          y: 21.33330973872428,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 16.740742173215146,
          y: 21.33330973872428,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 17.474037633314694,
          y: 21.029568275599747,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 17.777779096439232,
          y: 20.296272815500203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 17.777779096439232,
          y: 13.185160668298252,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 19.111112465093886,
          y: 11.851827299643611,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 20.44444583374854,
          y: 13.185160668298252,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 20.44444583374854,
          y: 20.296272815500203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 19.359656528888348,
          y: 22.915187171173383,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 16.740742173215146,
          y: 23.999975204467773,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.70370397842484,
          y: 23.999975204467773,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 1.0847896227516356,
          y: 22.915187171173383,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0,
          y: 20.296272815500203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0,
          y: 7.259234302818558,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 1.0847896227516356,
          y: 4.640319629253929,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.70370397842484,
          y: 3.5555300065023023,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.814815807735402,
          y: 3.5555300065023023,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 12.148149176390053,
          y: 4.888863375156944,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.814815807735402,
          y: 6.222196743811586,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.55545339466398,
          y: 1.986821545145872e-8,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 14.222120026009327,
          y: 1.3333333686546418,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 22.66656554186599,
          y: 1.986821545145872e-8,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 23.999898910520642,
          y: 1.3333333686546418,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 23.999898910520642,
          y: 8.444444244290802,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 22.66656554186599,
          y: 9.777777612945444,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 21.333230901645546,
          y: 8.444444244290802,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 21.333230901645546,
          y: 2.6666667373092836,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.55545339466398,
          y: 2.6666667373092836,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 23.60944174685673,
          y: 2.276142498550014,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 23.60944174685673,
          y: 0.3905243182321316,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.572404505740769,
          y: 15.31318069334021,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.686786881732903,
          y: 15.31318069334021,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.686786881732903,
          y: 13.42756306933236,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 21.723826665980443,
          y: 0.3905243182321316,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
      ],
    };
    buttonOutline.vectorPaths = [
      {
        windingRule: "EVENODD",
        data: "M 3.70370397842484 6.222196743811586 C 3.428664298287204 6.222196743811586 3.164889737364822 6.331455557385077 2.970407564650948 6.525937571153226 C 2.7759255508827976 6.720419743867098 2.666666737309306 6.984194622680924 2.666666737309306 7.259234302818558 L 2.666666737309306 20.296272815500203 C 2.666666737309306 20.571312495637837 2.775925391937074 20.835086102885874 2.970407564650948 21.029568275599747 C 3.164890214201993 21.22405171987941 3.428665251961546 21.33330973872428 3.70370397842484 21.33330973872428 L 16.740742173215146 21.33330973872428 C 17.01578058178699 21.33330973872428 17.27955546060082 21.22405171987941 17.474037633314694 21.029568275599747 C 17.668521077594356 20.835086102885874 17.777779096439232 20.571311224072048 17.777779096439232 20.296272815500203 L 17.777779096439232 13.185160668298252 C 17.777779096439232 12.448781025377746 18.374733457956268 11.851827299643611 19.111112465093886 11.851827299643611 C 19.84749274379729 11.851827299643611 20.44444583374854 12.448781025377746 20.44444583374854 13.185160668298252 L 20.44444583374854 20.296272815500203 C 20.44444583374854 21.27855738742032 20.054234082281884 22.220608346214064 19.359656528888348 22.915187171173383 C 18.665077703929022 23.60976472456691 17.723026745135275 23.999975204467773 16.740742173215146 23.999975204467773 L 3.70370397842484 23.999975204467773 C 2.721420042287607 23.999975204467773 1.7793684477109604 23.6097659961327 1.0847896227516356 22.915187171173383 C 0.39021047990086355 22.220607074648274 0 21.27855611585453 0 20.296272815500203 L 0 7.259234302818558 C 0 6.276951161409952 0.39021032095513997 5.33489901052328 1.0847896227516356 4.640319629253929 C 1.779369004020993 3.9457403274574387 2.721420837016225 3.5555300065023023 3.70370397842484 3.5555300065023023 L 10.814815807735402 3.5555300065023023 C 11.551195450655912 3.5555300065023023 12.148149176390053 4.152483652763578 12.148149176390053 4.888863375156944 C 12.148149176390053 5.625243097550311 11.551195450655912 6.222196743811586 10.814815807735402 6.222196743811586 L 3.70370397842484 6.222196743811586 Z",
      },
      {
        windingRule: "EVENODD",
        data: "M 14.222120026009327 1.3333333686546418 C 14.222120026009327 0.5969536462612752 14.819073672270607 1.986821545145872e-8 15.55545339466398 1.986821545145872e-8 L 22.66656554186599 1.986821545145872e-8 C 23.4029451847865 1.986821545145872e-8 23.999898910520642 0.5969536462612752 23.999898910520642 1.3333333686546418 L 23.999898910520642 8.444444244290802 C 23.999898910520642 9.180823887211307 23.4029451847865 9.777777612945444 22.66656554186599 9.777777612945444 C 21.930185898945478 9.777777612945444 21.333230901645546 9.180823887211307 21.333230901645546 8.444444244290802 L 21.333230901645546 2.6666667373092836 L 15.55545339466398 2.6666667373092836 C 14.819073672270607 2.6666667373092836 14.222120026009327 2.0697130910480084 14.222120026009327 1.3333333686546418 Z",
      },
      {
        windingRule: "EVENODD",
        data: "M 23.60944174685673 0.3905243182321316 C 24.130140308013832 0.9112233562263992 24.130140308013832 1.755443460555746 23.60944174685673 2.276142498550014 L 10.572404505740769 15.31318069334021 C 10.051705467746498 15.833879254497306 9.207485919727175 15.833879254497306 8.686786881732903 15.31318069334021 C 8.16608776426577 14.792482132183112 8.16608776426577 13.948261630489457 8.686786881732903 13.42756306933236 L 21.723826665980443 0.3905243182321316 C 22.244525227137544 -0.1301747992349978 23.08874318569963 -0.1301747992349978 23.60944174685673 0.3905243182321316 Z",
      },
    ];
    openIcon.appendChild(buttonOutline);

    var buttonText = figma.createText();
    buttonText.resize(149.0, 26.0);
    buttonText.name = "Watch video 2:31";
    buttonText.relativeTransform = [
      [1, 0, 64],
      [0, 1, 19],
    ];
    buttonText.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    buttonText.x = 64;
    buttonText.y = 19;
    buttonText.hyperlink = {
      type: "URL",
      value: "https://www.loom.com/share/ba06c5819a6e46fb8de78ebc7c89a50b",
    };
    loadFonts().then((res) => {
      buttonText.fontName = {
        family: "Arial",
        style: "Bold",
      };
      buttonText.characters = "Watch video  2:31";
      buttonText.fontSize = 18;
      buttonText.letterSpacing = {
        unit: "PIXELS",
        value: -0.30000001192092896,
      };
      buttonText.lineHeight = { unit: "PERCENT", value: 145.00000476837158 };
      buttonText.fontName = {
        family: "Arial",
        style: "Bold",
      };
      buttonText.textAutoResize = "WIDTH_AND_HEIGHT";
    });
    centerButton.appendChild(buttonText);

    var frame_1848_3263 = figma.createFrame();
    frame_1848_3263.resize(246.0, 30.0);
    frame_1848_3263.primaryAxisSizingMode = "AUTO";
    frame_1848_3263.counterAxisSizingMode = "AUTO";
    frame_1848_3263.name = "Title";
    frame_1848_3263.relativeTransform = [
      [1, 0, 11],
      [0, 1, 10],
    ];
    frame_1848_3263.x = 11;
    frame_1848_3263.y = 10;
    frame_1848_3263.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.800000011920929,
        blendMode: "NORMAL",
        color: { r: 0, g: 0, b: 0 },
      },
    ];
    frame_1848_3263.cornerRadius = 6;
    frame_1848_3263.paddingLeft = 8;
    frame_1848_3263.paddingRight = 8;
    frame_1848_3263.paddingTop = 4;
    frame_1848_3263.paddingBottom = 4;
    frame_1848_3263.primaryAxisAlignItems = "CENTER";
    frame_1848_3263.counterAxisAlignItems = "CENTER";
    frame_1848_3263.backgrounds = [
      {
        type: "SOLID",
        visible: true,
        opacity: 0.800000011920929,
        blendMode: "NORMAL",
        color: { r: 0, g: 0, b: 0 },
      },
    ];
    frame_1848_3263.clipsContent = false;
    frame_1848_3263.expanded = false;
    frame_1848_3263.layoutMode = "HORIZONTAL";
    frame_1848_3263.counterAxisSizingMode = "AUTO";
    frame_1848_3263.itemSpacing = 8;
    parentFrame.appendChild(frame_1848_3263);

    var vector_1848_3264 = figma.createVector();
    vector_1848_3264.resize(16.0, 16.0);
    vector_1848_3264.name = "Loom";
    vector_1848_3264.opacity = 0.6000000238418579;
    vector_1848_3264.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    vector_1848_3264.strokes = [];
    vector_1848_3264.strokeAlign = "INSIDE";
    vector_1848_3264.relativeTransform = [
      [1, 0, 8],
      [0, 1, 7],
    ];
    vector_1848_3264.x = 8;
    vector_1848_3264.y = 7;
    vector_1848_3264.constraints = { horizontal: "SCALE", vertical: "SCALE" };
    vector_1848_3264.vectorNetwork = {
      regions: [
        {
          windingRule: "NONZERO",
          loops: [
            [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
              35, 36,
            ],
            [37, 38, 39, 40],
          ],
        },
      ],
      segments: [
        {
          start: 0,
          end: 1,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 1,
          end: 2,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 2,
          end: 3,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 3,
          end: 4,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 4,
          end: 5,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 5,
          end: 6,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 6,
          end: 7,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 7,
          end: 8,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 8,
          end: 9,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 9,
          end: 10,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 10,
          end: 11,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 11,
          end: 12,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 12,
          end: 13,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 13,
          end: 14,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 14,
          end: 15,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 15,
          end: 16,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 16,
          end: 17,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 17,
          end: 18,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 18,
          end: 19,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 19,
          end: 20,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 20,
          end: 21,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 21,
          end: 22,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 22,
          end: 23,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 23,
          end: 24,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 24,
          end: 25,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 25,
          end: 26,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 26,
          end: 27,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 27,
          end: 28,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 28,
          end: 29,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 29,
          end: 30,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 30,
          end: 31,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 31,
          end: 32,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 32,
          end: 33,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 33,
          end: 34,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 34,
          end: 35,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 35,
          end: 36,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 36,
          end: 0,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 37,
          end: 38,
          tangentStart: { x: -1.3419874367710518, y: 0 },
          tangentEnd: { x: 0, y: 1.3420250188989902 },
        },
        {
          start: 38,
          end: 39,
          tangentStart: { x: 0, y: -1.3420250188989902 },
          tangentEnd: { x: -1.3419874367710518, y: 0 },
        },
        {
          start: 39,
          end: 40,
          tangentStart: { x: 1.3419874367710518, y: 0 },
          tangentEnd: { x: 0, y: -1.3420250188989902 },
        },
        {
          start: 40,
          end: 37,
          tangentStart: { x: 0, y: 1.3420250188989902 },
          tangentEnd: { x: 1.3419874367710518, y: 0 },
        },
      ],
      vertices: [
        {
          x: 16,
          y: 7.11031528826275,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 11.321396438739361,
          y: 7.11031528826275,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.373321400878405,
          y: 4.770948337409687,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 14.483437571557591,
          y: 3.2292757012178517,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.431512609418546,
          y: 5.568642993593213,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 12.770367349879967,
          y: 1.5170522937235202,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 11.228737886756768,
          y: 0.6266961491482519,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.889883829320816,
          y: 4.678286849017944,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.889883829320816,
          y: 0,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 7.110116170679185,
          y: 0,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 7.110116170679185,
          y: 4.6787342432284245,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 4.7703670083672325,
          y: 0.6266961491482519,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.2291852684384006,
          y: 1.5166047287518913,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 5.568487049068721,
          y: 5.568195257860435,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 1.516562257686043,
          y: 3.2292757012178517,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0.6266785991215951,
          y: 4.7705006016769085,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 4.678603219747906,
          y: 7.10986789405227,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0,
          y: 7.10986789405227,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0,
          y: 8.889684711737251,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 4.678155838066273,
          y: 8.889684711737251,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0.6266785991215951,
          y: 11.22905234563491,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 1.516562257686043,
          y: 12.770724981826746,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 5.568039325874354,
          y: 10.431804742139565,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.228737545244034,
          y: 14.48339510048696,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 4.7703670083672325,
          y: 15.373303850851748,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 7.109668788997553,
          y: 11.321266098293874,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 7.109668788997553,
          y: 16,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.889435764613713,
          y: 16,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.889435764613713,
          y: 11.321713492504355,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 11.228289822049668,
          y: 15.373303850851748,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 12.769919285172866,
          y: 14.48339510048696,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.43061784605528,
          y: 10.431357347929087,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 14.482542808194324,
          y: 12.770724981826746,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.37242663751514,
          y: 11.22905234563491,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 11.320949057057728,
          y: 8.890132788992327,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.999105236636735,
          y: 8.890132788992327,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.999105236636735,
          y: 7.11031528826275,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8,
          y: 10.420613739476204,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 5.570277600333453,
          y: 7.990823295850692,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8,
          y: 5.561033193747479,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.429722399666547,
          y: 7.990823295850692,
          strokeCap: "NONE",
          strokeJoin: "MITER",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
      ],
    };
    vector_1848_3264.vectorPaths = [
      {
        windingRule: "NONZERO",
        data: "M 16 7.11031528826275 L 11.321396438739361 7.11031528826275 L 15.373321400878405 4.770948337409687 L 14.483437571557591 3.2292757012178517 L 10.431512609418546 5.568642993593213 L 12.770367349879967 1.5170522937235202 L 11.228737886756768 0.6266961491482519 L 8.889883829320816 4.678286849017944 L 8.889883829320816 0 L 7.110116170679185 0 L 7.110116170679185 4.6787342432284245 L 4.7703670083672325 0.6266961491482519 L 3.2291852684384006 1.5166047287518913 L 5.568487049068721 5.568195257860435 L 1.516562257686043 3.2292757012178517 L 0.6266785991215951 4.7705006016769085 L 4.678603219747906 7.10986789405227 L 0 7.10986789405227 L 0 8.889684711737251 L 4.678155838066273 8.889684711737251 L 0.6266785991215951 11.22905234563491 L 1.516562257686043 12.770724981826746 L 5.568039325874354 10.431804742139565 L 3.228737545244034 14.48339510048696 L 4.7703670083672325 15.373303850851748 L 7.109668788997553 11.321266098293874 L 7.109668788997553 16 L 8.889435764613713 16 L 8.889435764613713 11.321713492504355 L 11.228289822049668 15.373303850851748 L 12.769919285172866 14.48339510048696 L 10.43061784605528 10.431357347929087 L 14.482542808194324 12.770724981826746 L 15.37242663751514 11.22905234563491 L 11.320949057057728 8.890132788992327 L 15.999105236636735 8.890132788992327 L 15.999105236636735 7.11031528826275 L 16 7.11031528826275 Z M 8 10.420613739476204 C 6.658012563228948 10.420613739476204 5.570277600333453 9.332848314749683 5.570277600333453 7.990823295850692 C 5.570277600333453 6.648798276951702 6.658012563228948 5.561033193747479 8 5.561033193747479 C 9.341987436771053 5.561033193747479 10.429722399666547 6.648798276951702 10.429722399666547 7.990823295850692 C 10.429722399666547 9.332848314749683 9.341987436771053 10.420613739476204 8 10.420613739476204 Z",
      },
    ];
    frame_1848_3263.appendChild(vector_1848_3264);
    var text_1848_3265 = figma.createText();
    text_1848_3265.resize(206.0, 22.0);
    text_1848_3265.name = data.title;
    text_1848_3265.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: { r: 1, g: 1, b: 1 },
      },
    ];
    text_1848_3265.relativeTransform = [
      [1, 0, 32],
      [0, 1, 4],
    ];
    text_1848_3265.x = 32;
    text_1848_3265.y = 4;

    const font = await figma.loadFontAsync({ family: "Inter", style: "Bold" });

    loadFonts().then((res) => {
      text_1848_3265.fontName = {
        family: "Inter",
        style: "Bold",
      };

      text_1848_3265.characters = data.title;
      text_1848_3265.fontSize = 14;
      text_1848_3265.lineHeight = { unit: "PERCENT", value: 160.0000023841858 };
      text_1848_3265.fontName = { family: "Inter", style: "Bold" };
      text_1848_3265.textAutoResize = "WIDTH_AND_HEIGHT";
    });
    frame_1848_3263.appendChild(text_1848_3265);
  }
};
