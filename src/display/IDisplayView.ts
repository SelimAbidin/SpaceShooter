

interface IDisplayView {
    width: number;
    height: number;
    x: number;
    y: number;
    getChildView(): any;
}


interface IAnimatable {
    gotoAndStop(v: number): void;
}

export { IDisplayView, IAnimatable }