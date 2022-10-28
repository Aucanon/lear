function addEvent(element, type, handler)
{
    if (element.addEventListener)
    {
        element.addEventListener(type, handler, false);
    }
    else if (element.attachEvent)     //for IE
    {
        element.attachEvnet("on" + type, handler);
    }
    else
    {
        element["on" + type] = handler;
    }
}