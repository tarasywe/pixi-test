import { Scene } from '../../core/Scene'

export class RandomScene extends Scene {
    constructor() {
        super();
        this.createView(2);
    }
}