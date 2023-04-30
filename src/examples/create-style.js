window.addEventListener("load", function () {
  const styleController = new StyleController();

  window.styleController = styleController;
  window.myRule = styleController.insert(".foo", {
    backgroundColor: "red",
    children: [
      {
        selector: ".bar",
        rules: {
          border: "10px solid green",
        },
      },
    ],
  });

  window.nextRule = myRule.insert(".foo-bar", { padding: "10px" });
  nextRule.delete();
});
