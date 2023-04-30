# style-controller

Style controller to create virtual css styles

## Description

Small library to create and manage css style via js.
In some cases you want to avoid to manipulate dom elements directly (fe. your framework dont like it), or you
want to make the same change on multiple elements. This is where the StyleController has a practical use case.

## Usage

First create one or multiple style controllers.

```
  const styleController = new StyleController();
```
### Add a new style
The controller has an insert method, which takes 2 arguments.
 - selector // css selector
 - rules // an object of css properties to set

example:
```
const myFooStyle = styleController.insert('.foo', {
    backgroundColor: 'red'
})
```
### Modify Existing Style
After you created a style, you can modify it either directly or through the update method.

example direct change:

```
myFooStyle.style.backgroundColor = 'green';
myFooStyle.style.padding = '10px';
```

example update:

```
myFooStyle.update({
    backgroundColor: 'green',
    padding: '10px'
});
```

## Child Rules
you can append child rules to existing rules or initialize them directly with the controllers insert method.


example initialize child styles:
```
styleController.insert(".foo", {
    backgroundColor: "red",
    children: [
        {
            selector: '.bar',
            rules: {
                padding: '10px'
            }
        }
    ]
  })
```

example append child style:
```
const myBarStyle = myFooStyle.insert('.bar', {
    backgroundColor: 'red'
})
```
Note that we executed the insert method on `myFooStyle` and not on the `styleController`. With this we added a sub style for `myFooStyle`. The current selector for `myFooStyle` is `.foo` which means the actual selector of our new rule is `.foo .bar` and not `.bar` which we passed in the insert method. This is very useful if you intend to update the selector of the parent style.

## Update Selector
You can change the selector of you rule, which is useful in cases where you want for example to remove the `active` class from a list of elements and append it to a specific one. 

example:

```
myFooStyle.selector = '.foo-bar';
```

Note that any child styles of `myFooStyle` would now need an `.foo-bar` ancestor instead of an `.foo` ancestor.

### Delete Style
In case you are done with a style and want to delete it, you can delete an existing rule and all its children with the `delete` method:

example:
```
myFooStyle.delete()
```