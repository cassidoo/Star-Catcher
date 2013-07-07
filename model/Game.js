var winning = true;

function banana()
{
	var stage = new Kinetic.Stage({
		container: "container",
		width: screen.width,
		height: screen.height
	});
	var layer = new Kinetic.Layer();
	var enem = new Array();
	var sp = 500;
	var spawn = function(){
		var temp = new Kinetic.Star({
			x: (stage.getWidth()* Math.random()),
			y: -5,
			numPoints: 5,
			innerRadius: 20,
			outerRadius: 50,
			fill: "#f8b838",
			stroke: "black",
			strokeWidth: 4
		});
		layer.add(temp)
		enem.push(temp);
		sp = 2500;
	};
	spawn();
	
	var spawnInt = setInterval(spawn,sp);
	stage.add(layer);
	
	var index = -1;
	var s1 = 0;
	var loop = function(){
		for(var i = 0; i<enem.length; i++){
			if(i != index){
				s1 += 0.01;
				var cur = enem[i].getY()
				enem[i].setY(cur + s1);
				layer.draw();
			}
		}
	}
	
	loop();
	var fallInt = setInterval(loop,40);
	var t = 0;
	var remove = 0;
	var check = function(){
		if(t<enem.length){
			enem[t].on("mousedown",function(){
				this.hide();
				layer.draw();
			});
			t++;
			if(t == enem.length - 1){
				t = 0;
			}
		}	
	}
	
	check();
	
	var checkInt = setInterval(check, 1);
	var fell = function(){
		for(var i = 0; i<enem.length; i++)
		{
			if(enem[i].getY()>stage.getHeight() && enem[i].isVisible())
			{
				gameOver();
				break;
			}
		}
	}
	
	fell();
	
	fellInt = setInterval(fell,1);
	
	function gameOver(){
		clearInterval(fellInt);
		clearInterval(checkInt);
		clearInterval(fallInt);
		clearInterval(spawnInt);
		winning = false;	
	}
};
