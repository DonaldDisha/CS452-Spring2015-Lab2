var gl;
var points;
var x = .1;
var y = .1;
var dx = 0;
var dy = 0;

window.onload = function init() {
	
	// Retrieve <canvas> element
	var canvas = document.getElementById( "gl-canvas" );

	// Get Rendering context for WebGL
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.70, 1.0 );	
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	gl.program = program;
	
	// wasd is pressed and shape moves
	window.onkeydown = function(event) {
	var key =String.fromCharCode(event.keyCode);
	switch(key) {
		case 'W':
		dy+=.035;
		break;
		case 'S':
		dy-=.035;
		break;
		case 'D':
		dx+=.035;
		break;
		case 'A':
		dx-=.035;
		break;
		case '1':
		dy = 0.0;
		dx = 0.0;
		break;
	}
    }
	
	render();
	
};
	
	// vertices and colors
	function initVertexBuffers(gl){
	var vertices = new Float32Array([
	0.125 + dx, 0.0 + dy, 1.0, 0.0, 0.0,
	0.0 + dx, 0.125 + dy, 0.0, 1.0, 1.0,
	-0.125 + dx, -0.0 + dy, 0.0, 0.0, 1.0,
	-0.0675 + dx, -0.125 + dy, 1.0, 0.0, 1.0,
	0.0675 + dx, -0.125 + dy, 0.0, 0.0, 1.0,
	]);		
	
	// Load the data into the GPU
	
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	var FSIZE = vertices.BYTES_PER_ELEMENT; 
	
	var vPosition = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(vPosition);
	
	var vColor = gl.getAttribLocation( gl.program, 'vColor');
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, FSIZE * 5,  FSIZE *2);
    gl.enableVertexAttribArray(vColor);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	
}


function render() {

	gl.clear( gl.COLOR_BUFFER_BIT );
	initVertexBuffers(gl);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 5);
	window.requestAnimFrame(render);
}
