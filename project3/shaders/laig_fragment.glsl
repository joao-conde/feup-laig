#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform bool uUseTexture;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture)
	{
		// vec4 textureColor = texture2D(uSampler, vTextureCoord);

		// if(textureColor.r > 1.0)
		// 	gl_FragColor = textureColor; 
	}

}