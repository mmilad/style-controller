window.addEventListener("load", function () {
  const styleController = new StyleController();

  window.styleController = styleController;
  window.myFooStyle = styleController.insert(".foo", {
    backgroundColor: "red",
  });
  debugger
});
