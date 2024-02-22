//shows the UI
figma.showUI(__html__, { width: 400, height: 600 });


figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'extract') {
    const selectionType = figma.currentPage.selection[0].type;
    console.log(selectionType);
    const selected = figma.currentPage.selection as ComponentNode[] ;
    const properties = selected.map((layer) => {
      return {
        width: layer.width,
        height: layer.height,
        cornerRadius: layer.cornerRadius,
        name: layer.name,
        leftpadding: layer.paddingLeft,
        rightpadding: layer.paddingRight,
        toppadding: layer.paddingTop,
        bottompadding: layer.paddingBottom,
        hasbackground: layer.backgrounds,
        fills: layer.fills,
        layoutType: layer.layoutSizingHorizontal,
        verticalLayoutType: layer.layoutSizingVertical,
        id: layer.id,
        type: layer.type};
    });
    const propertiesString = JSON.stringify(properties);
    figma.ui.postMessage({message: propertiesString});
    console.log(propertiesString);  
     // Send the properties array directly to the UI
    figma.ui.postMessage({ type: 'export-csv', properties });

  }
  if (msg.type === 'close'){
    figma.closePlugin();
    console.log("Plugin closed");
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

////gets the selected layers
//const selected = figma.currentPage.selection as RectangleNode[] ;
//// const selectedLayers = figma.currentPage.selection;//
//

////sends the selected layers to the UI
//const properties = selected.map((layer) => {
//  return {
//    width: layer.width,
//    height: layer.height,
//    cornerRadius: layer.cornerRadius,
//    name: layer.name,
//    id: layer.id,
//    type: layer.type};
//});//

//properties.toString();
//console.log(properties);  