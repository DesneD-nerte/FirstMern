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

    let element1 = document.createElement("div");
    mainDiv.appendChild(element1);
    let instance1 = new DxButton(element1, {
        text: "15 минут",
        focusStateEnabled: false,
        onClick: () => setSelectedTimeRange(timeRange[0]),
    });

    let element2 = document.createElement("div");
    mainDiv.appendChild(element2);
    let instance2 = new DxButton(element2, {
        text: "30 минут",
        focusStateEnabled: false,
        onClick: () => setSelectedTimeRange(timeRange[1]),
    });

    let element3 = document.createElement("div");
    mainDiv.appendChild(element3);
    let instance3 = new DxButton(element3, {
        text: "1 час",
        focusStateEnabled: false,
        onClick: () => setSelectedTimeRange(timeRange[2]),
    });

}

export default TimeButtonsHandler