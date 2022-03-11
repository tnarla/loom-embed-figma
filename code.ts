function isLoomEmbedNode(node: SceneNode) {
  return node.name.includes("Loom Video");
}

if (figma.currentPage.selection.length > 0) {
  for (const node of figma.currentPage.selection) {
    if (node.setRelaunchData && isLoomEmbedNode(node)) {
      const relaunchData = node.getRelaunchData();
      figma.showUI(__html__, { width: 800, height: 600 });

      figma.ui.postMessage({
        type: "view",
        url: relaunchData.url,
      });
    }
  }
} else {
  figma.showUI(__html__, { width: 381, height: 81 });
}

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
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
  ]);
}

figma.root.setRelaunchData({ open: "" });

figma.on("selectionchange", () => {
  if (figma.currentPage.selection.length > 0) {
    for (const node of figma.currentPage.selection) {
      if (isLoomEmbedNode(node)) {
        figma.ui.postMessage({
          type: "view",
          url: node.children[2].children[1].hyperlink.value,
        });

        figma.ui.resize(800, 600);
      }
    }
  }
});

function thumbnail({ imageHash }: { imageHash: string }) {
  var node = figma.createRectangle();
  node.resize(571.0, 385.0);
  node.name = "Thumbnail";
  node.fills = [
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
  node.constrainProportions = true;
  node.constraints = { horizontal: "SCALE", vertical: "SCALE" };
  return node;
}

figma.ui.onmessage = async (msg) => {
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

    const data = msg.data;
    let imageHash = figma.createImage(new Uint8Array(data.thumbnailHash)).hash;
    var parentFrame = figma.createFrame();
    parentFrame.effectStyleId = shadow.id;
    parentFrame.resize(571.0, 385.0);
    parentFrame.primaryAxisSizingMode = "AUTO";
    parentFrame.name = "▶️ Loom Video";
    parentFrame.relativeTransform = [
      [1, 0, figma.viewport.center.x],
      [0, 1, figma.viewport.center.y],
    ];
    parentFrame.x = figma.viewport.center.x;
    parentFrame.y = figma.viewport.center.y;

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
    parentFrame.appendChild(thumbnail({ imageHash }));

    var overlayRect = figma.createRectangle();
    overlayRect.fillStyleId = darkOverlay.id;
    overlayRect.resize(571.0, 385.0);
    overlayRect.name = "Overlay";
    overlayRect.opacity = 0.15;
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
        color: { r: 0, g: 0, b: 0, a: 0.3 },
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
          r: 0.38,
          g: 0.36,
          b: 0.96,
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
          r: 0.38,
          g: 0.36,
          b: 0.96,
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
    buttonOutline.resize(24, 24);
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
          fills: [
            {
              type: "SOLID",
              visible: true,
              opacity: 1,
              blendMode: "NORMAL",
              color: { r: 1, g: 1, b: 1 },
            },
          ],
          fillStyleId: "",
        },
        {
          windingRule: "EVENODD",
          loops: [[24, 25, 26, 27, 28, 29, 34, 33, 36, 35, 31, 32, 30]],
          fills: [
            {
              type: "SOLID",
              visible: true,
              opacity: 1,
              blendMode: "NORMAL",
              color: { r: 1, g: 1, b: 1 },
            },
          ],
          fillStyleId: "",
        },
      ],
      segments: [
        {
          start: 0,
          end: 1,
          tangentStart: { x: 0.19448217749595642, y: -0.1944820135831833 },
          tangentEnd: { x: -0.2750396728515625, y: 0 },
        },
        {
          start: 2,
          end: 0,
          tangentStart: { x: 0, y: -0.2750396728515625 },
          tangentEnd: { x: -0.1944820135831833, y: 0.19448217749595642 },
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
          tangentStart: { x: -0.19448217749595642, y: -0.19448217749595642 },
          tangentEnd: { x: 0, y: 0.2750396728515625 },
        },
        {
          start: 5,
          end: 4,
          tangentStart: { x: -0.2750387191772461, y: 0 },
          tangentEnd: { x: 0.19448265433311462, y: 0.1944834440946579 },
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
          tangentStart: { x: -0.19448217749595642, y: 0.1944834440946579 },
          tangentEnd: { x: 0.2750384211540222, y: 0 },
        },
        {
          start: 8,
          end: 7,
          tangentStart: { x: 0, y: 0.2750384211540222 },
          tangentEnd: { x: 0.1944834440946579, y: -0.19448217749595642 },
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
          tangentStart: { x: -0.7363790273666382, y: 0 },
          tangentEnd: { x: 0, y: -0.7363796234130859 },
        },
        {
          start: 11,
          end: 10,
          tangentStart: { x: 0, y: -0.7363796234130859 },
          tangentEnd: { x: 0.7363802790641785, y: 0 },
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
          tangentStart: { x: 0.6945775747299194, y: -0.6945788264274597 },
          tangentEnd: { x: 0, y: 0.9822845458984375 },
        },
        {
          start: 14,
          end: 13,
          tangentStart: { x: 0.9822845458984375, y: 0 },
          tangentEnd: { x: -0.6945788264274597, y: 0.6945775747299194 },
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
          tangentStart: { x: 0.6945788264274597, y: 0.6945788264274597 },
          tangentEnd: { x: -0.9822839498519897, y: 0 },
        },
        {
          start: 17,
          end: 16,
          tangentStart: { x: 0, y: 0.9822832942008972 },
          tangentEnd: { x: -0.6945791244506836, y: -0.694580078125 },
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
          tangentStart: { x: -0.6945793032646179, y: 0.6945793628692627 },
          tangentEnd: { x: 0, y: -0.9822831153869629 },
        },
        {
          start: 20,
          end: 19,
          tangentStart: { x: -0.9822831153869629, y: 0 },
          tangentEnd: { x: 0.6945793628692627, y: -0.6945793032646179 },
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
          tangentStart: { x: 0, y: -0.7363797426223755 },
          tangentEnd: { x: 0.7363796234130859, y: 0 },
        },
        {
          start: 23,
          end: 22,
          tangentStart: { x: 0.7363796234130859, y: 0 },
          tangentEnd: { x: 0, y: 0.7363797426223755 },
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
          tangentStart: { x: -0.7363797426223755, y: 0 },
          tangentEnd: { x: 0, y: -0.7363797426223755 },
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
          tangentStart: { x: 0, y: -0.7363797426223755 },
          tangentEnd: { x: 0.7363796234130859, y: 0 },
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
          tangentStart: { x: 0.7363796234130859, y: 0 },
          tangentEnd: { x: 0, y: 0.7363796234130859 },
        },
        {
          start: 30,
          end: 29,
          tangentStart: { x: 0, y: 0.7363796234130859 },
          tangentEnd: { x: -0.7363796234130859, y: 0 },
        },
        {
          start: 25,
          end: 32,
          tangentStart: { x: 0, y: 0.7363797426223755 },
          tangentEnd: { x: -0.7363797426223755, y: 0 },
        },
        {
          start: 34,
          end: 31,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0.3132133483886719, y: -0.4275627136230469 },
        },
        {
          start: 32,
          end: 34,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 33,
          end: 35,
          tangentStart: { x: 0.4275951385498047, y: -0.31318092346191406 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 35,
          end: 30,
          tangentStart: { x: 0, y: 0 },
          tangentEnd: { x: 0, y: 0 },
        },
        {
          start: 31,
          end: 36,
          tangentStart: { x: -0.3132133483886719, y: 0.4275627136230469 },
          tangentEnd: { x: -0.7804384231567383, y: -0.655125617980957 },
        },
        {
          start: 36,
          end: 33,
          tangentStart: { x: 0.7804384231567383, y: 0.655125617980957 },
          tangentEnd: { x: -0.4275951385498047, y: 0.31318092346191406 },
        },
      ],
      vertices: [
        {
          x: 2.970407485961914,
          y: 6.525937557220459,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.7037038803100586,
          y: 6.222196578979492,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 2.6666667461395264,
          y: 7.259234428405762,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 2.6666667461395264,
          y: 20.29627227783203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 2.970407485961914,
          y: 21.02956771850586,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.7037038803100586,
          y: 21.333309173583984,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 16.740741729736328,
          y: 21.333309173583984,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 17.474037170410156,
          y: 21.02956771850586,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 17.77777862548828,
          y: 20.29627227783203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 17.77777862548828,
          y: 13.185160636901855,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 19.111112594604492,
          y: 11.851827621459961,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 20.444446563720703,
          y: 13.185160636901855,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 20.444446563720703,
          y: 20.29627227783203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 19.359657287597656,
          y: 22.91518783569336,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 16.740741729736328,
          y: 23.999975204467773,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.7037038803100586,
          y: 23.999975204467773,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 1.0847896337509155,
          y: 22.91518783569336,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0,
          y: 20.29627227783203,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 0,
          y: 7.259234428405762,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 1.0847896337509155,
          y: 4.64031982421875,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 3.7037038803100586,
          y: 3.555530071258545,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.814815521240234,
          y: 3.555530071258545,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 12.148149490356445,
          y: 4.888863563537598,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.814815521240234,
          y: 6.222196578979492,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 15.555453300476074,
          y: 3.973643103449831e-8,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 14.22212028503418,
          y: 1.3333333730697632,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 22.66656494140625,
          y: 3.973643103449831e-8,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 23.99989891052246,
          y: 1.3333333730697632,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 23.99989891052246,
          y: 8.44444465637207,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 22.66656494140625,
          y: 9.777777671813965,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 21.33323097229004,
          y: 8.44444465637207,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.686786651611328,
          y: 13.427562713623047,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "ANGLE_AND_LENGTH",
        },
        {
          x: 15.555453300476074,
          y: 2.6666667461395264,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 10.572404861450195,
          y: 15.313180923461914,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "ANGLE_AND_LENGTH",
        },
        {
          x: 19.291593551635742,
          y: 2.6666667461395264,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 21.33323097229004,
          y: 4.552353858947754,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "NONE",
        },
        {
          x: 8.686786651611328,
          y: 15.313180923461914,
          strokeCap: "ROUND",
          strokeJoin: "ROUND",
          cornerRadius: 0,
          handleMirroring: "ANGLE_AND_LENGTH",
        },
      ],
    };

    buttonOutline.vectorPaths = [
      {
        windingRule: "EVENODD",
        data: "M 3.7037038803100586 6.222196578979492 C 3.428664207458496 6.222196578979492 3.1648896634578705 6.331455543637276 2.970407485961914 6.525937557220459 C 2.7759254723787308 6.720419734716415 2.6666667461395264 6.984194755554199 2.6666667461395264 7.259234428405762 L 2.6666667461395264 20.29627227783203 C 2.6666667461395264 20.571311950683594 2.7759253084659576 20.835085541009903 2.970407485961914 21.02956771850586 C 3.1648901402950287 21.224051162600517 3.4286651611328125 21.333309173583984 3.7037038803100586 21.333309173583984 L 16.740741729736328 21.333309173583984 C 17.01578015089035 21.333309173583984 17.2795549929142 21.224051162600517 17.474037170410156 21.02956771850586 C 17.668520614504814 20.835085541009903 17.77777862548828 20.571310698986053 17.77777862548828 20.29627227783203 L 17.77777862548828 13.185160636901855 C 17.77777862548828 12.44878101348877 18.374733567237854 11.851827621459961 19.111112594604492 11.851827621459961 C 19.84749287366867 11.851827621459961 20.444446563720703 12.44878101348877 20.444446563720703 13.185160636901855 L 20.444446563720703 20.29627227783203 C 20.444446563720703 21.27855682373047 20.054234862327576 22.2206090092659 19.359657287597656 22.91518783569336 C 18.665078461170197 23.60976541042328 17.723026275634766 23.999975204467773 16.740741729736328 23.999975204467773 L 3.7037038803100586 23.999975204467773 C 2.721419930458069 23.999975204467773 1.7793684601783752 23.60976666212082 1.0847896337509155 22.91518783569336 C 0.39021050930023193 22.22060775756836 0 21.27855557203293 0 20.29627227783203 L 0 7.259234428405762 C 0 6.276951313018799 0.3902103304862976 5.334899187088013 1.0847896337509155 4.64031982421875 C 1.7793689966201782 3.945740520954132 2.7214207649230957 3.555530071258545 3.7037038803100586 3.555530071258545 L 10.814815521240234 3.555530071258545 C 11.55119514465332 3.555530071258545 12.148149490356445 4.152483820915222 12.148149490356445 4.888863563537598 C 12.148149490356445 5.625243306159973 11.55119514465332 6.222196578979492 10.814815521240234 6.222196578979492 L 3.7037038803100586 6.222196578979492 Z",
      },
      {
        windingRule: "EVENODD",
        data: "M 14.22212028503418 1.3333333730697632 C 14.22212028503418 0.5969536304473877 14.819073557853699 3.973643103449831e-8 15.555453300476074 3.973643103449831e-8 L 22.66656494140625 3.973643103449831e-8 C 23.402944564819336 3.973643103449831e-8 23.99989891052246 0.5969536304473877 23.99989891052246 1.3333333730697632 L 23.99989891052246 8.44444465637207 C 23.99989891052246 9.180824279785156 23.402944564819336 9.777777671813965 22.66656494140625 9.777777671813965 C 21.930185317993164 9.777777671813965 21.33323097229004 9.180824279785156 21.33323097229004 8.44444465637207 L 21.33323097229004 4.552353858947754 C 21.33323097229004 4.552353858947754 11 15 10.572404861450195 15.313180923461914 C 10.14480972290039 15.626361846923828 9.467225074768066 15.968306541442871 8.686786651611328 15.313180923461914 C 7.90634822845459 14.658055305480957 8.373573303222656 13.855125427246094 8.686786651611328 13.427562713623047 C 9 13 19.291593551635742 2.6666667461395264 19.291593551635742 2.6666667461395264 L 15.555453300476074 2.6666667461395264 C 14.819073557853699 2.6666667461395264 14.22212028503418 2.0697131156921387 14.22212028503418 1.3333333730697632 Z",
      },
    ];

    openIcon.appendChild(buttonOutline);

    var buttonText = figma.createText();
    buttonText.resize(149.0, 26.0);
    buttonText.name = "Watch video";
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
      value: data.embedUrl,
    };
    await loadFonts();
    buttonText.fontName = {
      family: "Arial",
      style: "Bold",
    };
    buttonText.characters = "Watch video";
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

    text_1848_3265.fontName = {
      family: "Inter",
      style: "Bold",
    };

    text_1848_3265.characters = data.title;
    text_1848_3265.fontSize = 14;
    text_1848_3265.lineHeight = { unit: "PERCENT", value: 160.0 };
    text_1848_3265.fontName = { family: "Inter", style: "Bold" };
    text_1848_3265.textAutoResize = "WIDTH_AND_HEIGHT";
    frame_1848_3263.appendChild(text_1848_3265);

    parentFrame.setRelaunchData({
      relaunch: "",
      url: data.embedUrl,
    });

    figma.closePlugin();
  }
};
