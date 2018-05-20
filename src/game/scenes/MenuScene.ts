import { Scene } from '../../core/Scene'


export class MenuScene extends Scene {

	private menuContainer: PIXI.Container;
	private buttons: PIXI.Graphics[];

	constructor() {
		super();
		this.buttons = [];
		this.createView();
	}

	createView() {
		this.menuContainer = new PIXI.Container;
		this.menuContainer.interactive = true;
		
		this.createMenuButtons(0, 'cardScene');
		this.createMenuButtons(1, 'randomScene');
		this.createMenuButtons(2, 'fireScene');

		this.addChild(this.menuContainer);
	}

	createMenuButtons(n: number, scene: string){
		const buttonTexture = PIXI.Texture.fromImage('assets/button.png');
		const sprite = new PIXI.Sprite(buttonTexture);
		sprite.interactive = true;
		sprite.buttonMode = true;
		sprite.on('pointerdown', () => this.selectScene(scene));
		sprite.y = n * 50;

		const style = { fontFamily: "Helvetica, sans-serif", fontSize: "18px", fill: 'white' };
		const text = new PIXI.Text(scene, style);
		text.x = 20;
		text.y = (n * 50) + 5;

		this.menuContainer.addChild(sprite);
		this.menuContainer.addChild(text);
	}

	selectScene = (scene: string) => {
		this.navigate(scene);
	}

}