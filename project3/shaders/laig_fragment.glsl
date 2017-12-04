#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform bool uUseTexture;

uniform float timeFactor;
uniform float red;
uniform float green;
uniform float blue;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture)
	{
		vec4 textureColor = texture2D(uSampler, vTextureCoord) * timeFactor;

		vec4 timeColor = vec4(red,green,blue,1) * (1.0 - timeFactor);

		gl_FragColor =  vFinalColor * (timeColor + textureColor);
	}
	else
		gl_FragColor = vFinalColor;

}