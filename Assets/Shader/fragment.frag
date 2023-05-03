#version 330 

uniform sampler2D tex;
uniform sampler2D noise_tex1;
uniform sampler2D ui_tex;
uniform int time;
uniform int choice;

in vec2 uvs;
out vec4 f_color;


void main(){
    f_color = vec4(texture(tex, uvs).rgb ,1.0);
    vec2 px_uvs = vec2(floor(uvs.x * 320) / 320, floor(uvs.y * 210) / 210);
    float center_dis = distance(uvs, vec2(0.5,0.5));
    float noise_val = center_dis + texture(noise_tex1, vec2(px_uvs.x * 1.52 * 2 + time * 0.001, px_uvs.y * 2 - time * 0.002)).r * 0.5;
    vec4 dark = vec4(0.381, 0.063, 0.165, 1.0);
    if (choice == 0){
        dark = vec4(0.1176, 0.1137, 0.2235, 1.0);
    }
    float darkness = max(0, noise_val - 0.7) * 10;
    float vignette = max(0, center_dis * center_dis - 0.1) * 5;
    darkness += center_dis;
    f_color = darkness * dark + (1 - darkness) * f_color;
    vec4 ui_color = texture(ui_tex, uvs);
    if (ui_color.a > 0){
        f_color = ui_color;
    }    
}