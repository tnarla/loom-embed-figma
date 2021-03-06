var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
// Load FONTS
function loadFonts() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([
            figma.loadFontAsync({
                family: "Arial",
                style: "Bold",
            }),
            figma.loadFontAsync({
                family: "Arial",
                style: "Regular",
            }),
        ]);
    });
}
let data;
if (data) {
    figma.ui.postMessage({
        dataUrl: data.embedUrl,
        selection: figma.currentPage.selection,
    });
}
figma.ui.onmessage = (msg) => {
    if (msg.type === "create") {
        data = msg.data;
        let imageHash = figma.createImage(new Uint8Array(data.thumbnailHash)).hash;
        var parentFrame = figma.createFrame();
        parentFrame.resize(544, (data.height / data.width) * 544);
        parentFrame.cornerRadius = 8;
        parentFrame.paddingLeft = 32;
        parentFrame.paddingRight = 32;
        parentFrame.paddingTop = 32;
        parentFrame.paddingBottom = 32;
        parentFrame.primaryAxisSizingMode = "FIXED";
        parentFrame.layoutMode = "VERTICAL";
        parentFrame.itemSpacing = 16;
        parentFrame.name = "Loom Embed";
        figma.currentPage.appendChild(parentFrame);
        var thumbnail = figma.createFrame();
        thumbnail.resize(480, (data.height / data.width) * 480);
        thumbnail.layoutAlign = "STRETCH";
        thumbnail.layoutGrow = 1;
        thumbnail.fills = [
            {
                type: "IMAGE",
                scaleMode: "FILL",
                imageHash: imageHash,
            },
        ];
        thumbnail.cornerRadius = 4;
        thumbnail.primaryAxisSizingMode = "AUTO";
        thumbnail.backgrounds = [
            {
                type: "IMAGE",
                scaleMode: "FILL",
                imageHash: imageHash,
            },
        ];
        thumbnail.layoutMode = "VERTICAL";
        parentFrame.appendChild(thumbnail);
        // Create TEXT
        var title = figma.createText();
        title.resize(480, 25);
        title.name = data.title;
        title.relativeTransform = [
            [1, 0, 32],
            [0, 1, 376],
        ];
        title.x = 32;
        title.y = 376;
        title.layoutAlign = "STRETCH";
        loadFonts().then((res) => {
            title.fontName = {
                family: "Arial",
                style: "Bold",
            };
            title.characters = data.title;
            title.fontSize = 22;
            title.fontName = { family: "Arial", style: "Bold" };
            title.textAutoResize = "HEIGHT";
        });
        parentFrame.appendChild(title);
        // Create FRAME
        var linkFrame = figma.createFrame();
        linkFrame.resize(480, 17);
        linkFrame.relativeTransform = [
            [1, 0, 32],
            [0, 1, 417],
        ];
        linkFrame.x = 32;
        linkFrame.y = 417;
        linkFrame.layoutAlign = "MIN";
        linkFrame.primaryAxisAlignItems = "MIN";
        linkFrame.primaryAxisSizingMode = "FIXED";
        linkFrame.layoutMode = "HORIZONTAL";
        parentFrame.appendChild(linkFrame);
        // Create TEXT
        var watchOnLoom = figma.createText();
        watchOnLoom.resize(131.0, 16.0);
        watchOnLoom.name = "View video on Loom";
        watchOnLoom.fills = [
            {
                type: "SOLID",
                visible: true,
                opacity: 1,
                blendMode: "NORMAL",
                color: { r: 0, g: 0.6700000166893005, b: 0.9700000286102295 },
            },
        ];
        watchOnLoom.hyperlink = { type: "URL", value: data.embedUrl };
        loadFonts().then((res) => {
            watchOnLoom.fontName = {
                family: "Arial",
                style: "Regular",
            };
            watchOnLoom.characters = "View video on Loom";
            watchOnLoom.fontSize = 14;
            watchOnLoom.textDecoration = "UNDERLINE";
            watchOnLoom.fontName = { family: "Arial", style: "Regular" };
            watchOnLoom.textAutoResize = "WIDTH_AND_HEIGHT";
        });
        linkFrame.appendChild(watchOnLoom);
    }
    // figma.closePlugin();
};
