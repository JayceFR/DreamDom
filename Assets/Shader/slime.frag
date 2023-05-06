#version 330 

uniform sampler2D tex;
uniform sampler2D ui_tex;
uniform float time;

in vec2 uvs;
out vec4 f_color;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main(){
    vec3 color = vec3(0.2,0.12,0.4);
    vec2 st = uvs;
    st *= 5.0;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 1.0;  // minimum distance
    for (int j= -1; j <= 1; j++ ) {
        for (int i= -1; i <= 1; i++ ) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(i),float(j));

            
            vec2 offset = random2(i_st + neighbor);
            offset = 0.5 + 0.5*sin(time + 6.2831*offset);

            // Position of the cell
            vec2 pos = neighbor + offset - f_st;

            // Cell distance
            float dist = length(pos);

            // Metaball it!
            m_dist = min(m_dist, m_dist*dist);
        }
    }
    color -= step(0.060, m_dist);
    f_color = vec4(color, 1.0);
    vec4 display_color = texture(tex, uvs);
    if (display_color.x > 0){
        f_color = display_color;
    }
    vec4 ui_color = texture(ui_tex, uvs);
    if (ui_color.a > 0){
        f_color = ui_color;
    }  
}