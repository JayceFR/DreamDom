#version 330

uniform sampler2D blank_tex;
uniform sampler2D tex;
uniform sampler2D noise_tex1;
uniform sampler2D ui_tex;
uniform int time;

in vec2 uvs;
out vec4 f_color;

void main(){
    f_color = vec4(texture(tex, uvs).rgb, 1.0);
    vec2 px_uvs = vec2(floor(uvs.x * 320) / 320, floor(uvs.y * 210) / 210);
    float center_dis = distance(uvs, vec2(0.5,0.5));
    float noise_val = texture(noise_tex1, vec2(px_uvs.x + cos(time * 0.01 * 0.5) , px_uvs.y - sin(time * 0.01 * 0.5) )).r ; 
    if (noise_val > 0.4){
        f_color = vec4(0.4275, 0.502, 0.9804, 1.0);
    }
    else if (noise_val > 0.6){
        f_color = vec4(0.5, 1.0, 1.0, 1.0);
    }
    vec4 ui_color = texture(ui_tex, uvs);
    if (ui_color.a > 0){
        f_color = ui_color;
    }  
}