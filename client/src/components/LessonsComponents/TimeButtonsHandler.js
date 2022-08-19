import DxButton from "devextreme/ui/button";

function TimeButtonsHandler(setSelectedTimeRange, timeRange) {
    let container0 = document.getElementsByClassName(
        "dx-scheduler-navigator"
    )[0];
    container0.style.verticalAlign = "baseline";

    let mainContainer =
        document.getElementsByClassName("dx-toolbar-before")[0];
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("d-none", "d-sm-block");
    mainContainer.appendChild(mainDiv);

    for(let i = 0; i < 3; i++) {
        const dxButtonOptions = {
            text: 15 * (i + 1) + "минут",
            focusStateEnabled: false,
            onClick: () => setSelectedTimeRange(timeRange[i])
        }
        if(i === 2) {
            dxButtonOptions.text = "1 час";
        }
        let element = document.createElement("div");
        new DxButton(element, dxButtonOptions);

        mainDiv.appendChild(element);
    }
}

export default TimeButtonsHandler