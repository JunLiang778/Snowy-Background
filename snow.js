window.onload=function(){
 
    //get the canvas and context and store in vars
    let canvas = document.getElementById('sky');
	let ctx = canvas.getContext('2d');
    //set canvas dimension to window dimension(hegiht&width)
    //by default the canvas is 300 px in width
    let W = window.innerWidth;
	let H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

    //generate the snow flakes and apply attributes
    //each flake is an obj
    var mf =100; //maximum flakes
    var flakes=[];

    //loop through the empty flakes and apply attributes
	for (let i = 0; i < mf; i++) {
		flakes.push({
			x: Math.random()*W,
			y: Math.random()*H,
			r: Math.random()*5+2,//min of 2px and max of 7px
			d: Math.random() + 1 //density of the flake
		})
	}



    //draw flakes onto canvas
    function drawFlakes(){

        ctx.clearRect(0, 0, W, H); //Clears the specified pixels within a given rectangle
        //basically clearing anything current on the canvas (clear screen)
        ctx.fillStyle="white";
        ctx.beginPath();
        for(var i=0;i<mf;i++){
            var f = flakes[i];
            ctx.moveTo(f.x,f.y); //	Moves the path to the specified point in the canvas, without creating a line (starting from 0,0)
            ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);//draw arc (0= start at 0degree) (Math.Pi*2= 360 degrees) (true=clockwise)
        

        }
        ctx.fill();//fill with white
        moveFlakes();
    }
    
    //animate flakes
    var angle=0;
    function moveFlakes(){
        angle +=0.01; //angle controls the left and right movement of the flakes
        for(var i=0;i<mf;i++){
            var f = flakes[i];

            //update the x and y coordinate of each snowflake
            f.y+=Math.pow(f.d,2)+1; 
            //adding tht to the current coordinate (Eg:if the current coordinate is 10, then we add 5, so the next coordinate will be 15 [goes down 5px])
            f.x+=Math.sin(angle)*2; //creates a sin WAVE down the window (sway left ot right to left....)

            //if end,send new one to the top (send new obj)
            if(f.y>H){
                flakes[i]={
                    x:Math.random()*W,
                    y:0,
                    r:f.r,
                    d:f.d
                }
            }
        }
    }

    setInterval(drawFlakes,25)
    
};