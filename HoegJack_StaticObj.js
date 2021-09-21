var LINE_VSHADER=`#version 300 es
	precision mediump float;
	uniform mat4 u_ModelMatrix;
	uniform mat4 u_VpMatrix;
	uniform vec4 u_Color;
	
	in vec4 a_Position;
	
	out vec4 v_Color;
	
	void main() {
		gl_Position = u_VpMatrix * u_ModelMatrix * a_Position;
		v_Color = u_Color;
	}`,LINE_FSHADER=`#version 300 es
	precision mediump float;
	
	in vec4 v_Color;
	out vec4 myOutputColor;
	
	void main() {
		myOutputColor = v_Color;
	}`;function GroundGrid(){this.VSHADER_SOURCE=`#version 300 es
		uniform mat4 u_ModelMatrix;
		uniform mat4 u_VpMatrix;
		
		in vec4 a_Position;
		in vec4 a_Color;
		
		out vec4 v_Color;
		
		void main() {
			gl_Position = u_VpMatrix * u_ModelMatrix * a_Position;
			v_Color = a_Color;
		}
	`,this.FSHADER_SOURCE=`#version 300 es
		precision mediump float;
		
		in vec4 v_Color;
		
		out vec4 myOutputColor;
		void main() {
			myOutputColor = v_Color;
		}
	`,this.floatsPerVertex=7,this.vboContents=this.make(),this.vboVerts=this.vboContents.length/this.floatsPerVertex,this.FSIZE=this.vboContents.BYTES_PER_ELEMENT,this.vboBytes=this.vboContents.length*this.FSIZE,this.vboStride=this.vboBytes/this.vboVerts,this.vboFcount_a_Position=4,this.vboFcount_a_Color=3,console.assert((this.vboFcount_a_Position+this.vboFcount_a_Color)*this.FSIZE==this.vboStride,"Uh oh! GroundGrid.vboStride disagrees with attribute-size values!"),this.vboOffset_a_Position=0,this.vboOffset_a_Color=this.vboFcount_a_Position*this.FSIZE,this.vboLoc,this.shaderLoc,this.a_PosLoc,this.a_ColrLoc,this.modelMats=[],this.u_MvpMatLoc}GroundGrid.prototype.init=function(){for(i=0;i<9;i++)this.modelMats[i]=glMatrix.mat4.create();if(glMatrix.mat4.translate(this.modelMats[1],this.modelMats[1],[-200,-200,0]),glMatrix.mat4.translate(this.modelMats[2],this.modelMats[2],[-200,0,0]),glMatrix.mat4.translate(this.modelMats[3],this.modelMats[3],[-200,200,0]),glMatrix.mat4.translate(this.modelMats[4],this.modelMats[4],[0,-200,0]),glMatrix.mat4.translate(this.modelMats[5],this.modelMats[5],[0,200,0]),glMatrix.mat4.translate(this.modelMats[6],this.modelMats[6],[200,-200,0]),glMatrix.mat4.translate(this.modelMats[7],this.modelMats[7],[200,0,0]),glMatrix.mat4.translate(this.modelMats[8],this.modelMats[8],[200,200,0]),this.shaderLoc=createProgram(gl,this.VSHADER_SOURCE,this.FSHADER_SOURCE),this.shaderLoc){if(gl.program=this.shaderLoc,this.vaoLoc=gl.createVertexArray(),gl.bindVertexArray(this.vaoLoc),this.vboLoc=gl.createBuffer(),this.vboLoc)return gl.bindBuffer(gl.ARRAY_BUFFER,this.vboLoc),gl.bufferData(gl.ARRAY_BUFFER,this.vboContents,gl.STATIC_DRAW),this.a_PosLoc=gl.getAttribLocation(this.shaderLoc,"a_Position"),this.a_PosLoc<0?(console.log(this.constructor.name+".init() Failed to get GPU location of attribute a_Position"),-1):(this.a_ColrLoc=gl.getAttribLocation(this.shaderLoc,"a_Color"),this.a_ColrLoc<0?(console.log(this.constructor.name+".init() failed to get the GPU location of attribute a_Color"),-1):(this.u_VpMatLoc=gl.getUniformLocation(this.shaderLoc,"u_VpMatrix"),void(this.u_VpMatLoc?(this.u_ModelMatLoc=gl.getUniformLocation(this.shaderLoc,"u_ModelMatrix"),this.u_ModelMatLoc?(gl.enableVertexAttribArray(this.a_PosLoc),gl.vertexAttribPointer(this.a_PosLoc,this.vboFcount_a_Position,gl.FLOAT,!1,this.vboStride,this.vboOffset_a_Position),gl.enableVertexAttribArray(this.a_ColrLoc),gl.vertexAttribPointer(this.a_ColrLoc,this.vboFcount_a_Color,gl.FLOAT,!1,this.vboStride,this.vboOffset_a_Color),gl.bindVertexArray(null)):console.log(this.constructor.name+".init() failed to get GPU location for u_ModelMatrix uniform")):console.log(this.constructor.name+".init() failed to get GPU location for u_VpMatrix uniform"))));console.log(this.constructor.name+".init() failed to create VBO in GPU. Bye!")}else console.log(this.constructor.name+".init() failed to create executable Shaders on the GPU. Bye!")},GroundGrid.prototype.draw=function(t){for(gl.useProgram(this.shaderLoc),gl.bindVertexArray(this.vaoLoc),gl.uniformMatrix4fv(this.u_VpMatLoc,!1,t.mvp),i=0;i<this.modelMats.length;i++)gl.uniformMatrix4fv(this.u_ModelMatLoc,!1,this.modelMats[i]),gl.drawArrays(gl.LINES,0,this.vboVerts);gl.bindVertexArray(null)},GroundGrid.prototype.make=function(){var t=100,i=new Float32Array([.75,.5,1]),o=new Float32Array([.1,.5,1]),r=new Float32Array(2*this.floatsPerVertex*200),a=t/99,e=t/99;for(v=0,j=0;v<200;v++,j+=this.floatsPerVertex)v%2==0?(r[j]=-t+v*a,r[j+1]=-t):(r[j]=-t+(v-1)*a,r[j+1]=t),r[j+2]=0,r[j+3]=1,r[j+4]=i[0],r[j+5]=i[1],r[j+6]=i[2];for(v=0;v<200;v++,j+=this.floatsPerVertex)v%2==0?(r[j]=-t,r[j+1]=-t+v*e):(r[j]=t,r[j+1]=-t+(v-1)*e),r[j+2]=0,r[j+3]=1,r[j+4]=o[0],r[j+5]=o[1],r[j+6]=o[2];return r};var generator={quad:function(t,i,o,r){var a=glMatrix.vec3.clone(i);glMatrix.vec3.normalize(a,a);var e=glMatrix.vec3.fromValues(1,0,0),s=glMatrix.vec3.fromValues(0,1,0),l=glMatrix.vec3.fromValues(0,0,1),i=glMatrix.quat.create();return glMatrix.quat.rotationTo(i,l,a),glMatrix.vec3.transformQuat(e,e,i),glMatrix.vec3.transformQuat(s,s,i),glMatrix.vec3.scale(e,e,o),glMatrix.vec3.scale(s,s,r),new Float32Array([t[0]+e[0]+s[0],t[1]+e[1]+s[1],t[2]+e[2]+s[2],t[0]-e[0]+s[0],t[1]-e[1]+s[1],t[2]-e[2]+s[2],t[0]-e[0]-s[0],t[1]-e[1]-s[1],t[2]-e[2]-s[2],t[0]+e[0]-s[0],t[1]+e[1]-s[1],t[2]+e[2]-s[2]])},quadIndLS:function(){return new Uint16Array([0,1,2,3,0])},quadHole:function(t,o,r,a,e){var s=glMatrix.vec3.clone(o);glMatrix.vec3.normalize(s,s);var l=glMatrix.vec3.fromValues(1,0,0),n=glMatrix.vec3.fromValues(0,1,0),c=glMatrix.vec3.fromValues(0,0,1),o=glMatrix.quat.create();glMatrix.quat.rotationTo(o,c,s),glMatrix.vec3.transformQuat(l,l,o),glMatrix.vec3.transformQuat(n,n,o),glMatrix.vec3.scale(l,l,r),glMatrix.vec3.scale(n,n,a);var u=[t[0]+l[0]+n[0],t[1]+l[1]+n[1],t[2]+l[2]+n[2],t[0]+n[0],t[1]+n[1],t[2]+n[2],t[0]-l[0]+n[0],t[1]-l[1]+n[1],t[2]-l[2]+n[2],t[0]-l[0],t[1]-l[1],t[2]-l[2],t[0]-l[0]-n[0],t[1]-l[1]-n[1],t[2]-l[2]-n[2],t[0]-n[0],t[1]-n[1],t[2]-n[2],t[0]+l[0]-n[0],t[1]+l[1]-n[1],t[2]+l[2]-n[2],t[0]+l[0],t[1]+l[1],t[2]+l[2]],h=glMatrix.vec3.create(),v=glMatrix.vec3.create();glMatrix.vec3.normalize(l,l),glMatrix.vec3.normalize(n,n),glMatrix.vec3.scale(l,l,e),glMatrix.vec3.scale(n,n,e);var M=glMatrix.glMatrix.toRadian(22.5);for(i=0;i<16;i++)glMatrix.vec3.scale(h,l,Math.cos(i*M)),glMatrix.vec3.scale(v,n,Math.sin(i*M)),u.push(t[0]+h[0]+v[0]),u.push(t[1]+h[1]+v[1]),u.push(t[2]+h[2]+v[2]);return new Float32Array(u)},quadHoleIndLS:function(){var t=[0,2,4,6,0,1];for(i=12;i<=16;i++)t.push(i);for(t.push(3),i=16;i<=20;i++)t.push(i);for(t.push(5),i=20;i<24;i++)t.push(i);for(t.push(8),t.push(7),i=8;i<=12;i++)t.push(i);return new Uint16Array(t)},cube:function(t,i){var o=t[0]-i[0],r=t[0]+i[0],a=t[1]-i[1],e=t[1]+i[1],s=t[2]-i[2],i=t[2]+i[2];return new Float32Array([o,a,s,r,a,s,r,e,s,o,e,s,o,a,i,r,a,i,r,e,i,o,e,i])},cube2:function(t,i,o,r,a){var e=glMatrix.vec3.clone(t),s=glMatrix.vec3.create(),l=glMatrix.vec3.create(),t=glMatrix.vec3.create();return glMatrix.vec3.scale(s,o,i[0]),glMatrix.vec3.scale(l,r,i[1]),glMatrix.vec3.scale(t,a,i[2]),glMatrix.vec3.sub(e,e,t),glMatrix.vec3.scale(t,t,2),new Float32Array([e[0]-s[0]-l[0],e[1]-s[1]-l[1],e[2]-s[2]-l[2],e[0]+s[0]-l[0],e[1]+s[1]-l[1],e[2]+s[2]-l[2],e[0]+s[0]+l[0],e[1]+s[1]+l[1],e[2]+s[2]+l[2],e[0]-s[0]+l[0],e[1]-s[1]+l[1],e[2]-s[2]+l[2],e[0]-s[0]-l[0]+t[0],e[1]-s[1]-l[1]+t[1],e[2]-s[2]-l[2]+t[2],e[0]+s[0]-l[0]+t[0],e[1]+s[1]-l[1]+t[1],e[2]+s[2]-l[2]+t[2],e[0]+s[0]+l[0]+t[0],e[1]+s[1]+l[1]+t[1],e[2]+s[2]+l[2]+t[2],e[0]-s[0]+l[0]+t[0],e[1]-s[1]+l[1]+t[1],e[2]-s[2]+l[2]+t[2]])},cubeIndLS:function(){return new Uint16Array([0,1,5,1,2,6,2,3,7,3,0,4,5,6,7,4])},cylin:function(t,o,r,a,e){var s=glMatrix.vec3.fromValues(1,0,0),l=glMatrix.vec3.fromValues(0,1,0),n=glMatrix.vec3.fromValues(0,0,1),c=glMatrix.quat.create();glMatrix.quat.rotationTo(c,n,a),glMatrix.vec3.transformQuat(s,s,c),glMatrix.vec3.transformQuat(l,l,c),glMatrix.vec3.transformQuat(n,n,c),glMatrix.vec3.scale(s,s,o),glMatrix.vec3.scale(l,l,o),glMatrix.vec3.scale(n,n,r);var u=glMatrix.glMatrix.toRadian(360/e),h=glMatrix.vec3.create(),v=glMatrix.vec3.create(),M=[];for(i=0;i<2*e;i++)glMatrix.vec3.scale(h,s,Math.cos(i*u)),glMatrix.vec3.scale(v,l,Math.sin(i*u)),M.push(t[0]+h[0]+v[0]),M.push(t[1]+h[1]+v[1]),M.push(t[2]+h[2]+v[2]),M.push(t[0]+h[0]+v[0]+n[0]),M.push(t[1]+h[1]+v[1]+n[1]),M.push(t[2]+h[2]+v[2]+n[2]);return new Float32Array(M)},cylinIndLS:function(t){var o=[];for(i=0;i<=2*t;i+=2)o.push(i),o.push(i+1),o.push(i);for(i=1;i<2*t;i+=2)o.push(i);return o.push(1),new Uint16Array(o)},sphere:function(t,i,o){for(var r,a,e,s,l,n,c=[],u=0;u<=o;u++)for(s=u*Math.PI/o,l=Math.sin(s),n=Math.cos(s),r=0;r<=o;r++)e=2*r*Math.PI/o,a=Math.sin(e),e=Math.cos(e),c.push(a*l*i+t[0]),c.push(n*i+t[1]),c.push(e*l*i+t[2]);return new Float32Array(c)},sphereInd:function(t){var o,r,a=[];for(j=0;j<t;j++)for(i=0;i<t;i++)r=(o=j*(t+1)+i)+(t+1),a.push(o),a.push(r),a.push(o+1),a.push(o+1),a.push(r),a.push(r+1);return new Uint16Array(a)},sphereIndLS:function(t){var o,r,a=[];for(j=0;j<t;j++)for(i=0;i<t;i+=6)r=(o=j*(t+1)+i)+(t+1),a.push(o),a.push(r),a.push(r+1),a.push(r+2),a.push(r+3),a.push(r+4),a.push(r+5),a.push(r+6);return new Uint16Array(a)}};