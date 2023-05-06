#version 330 

uniform sampler2D tex;
uniform sampler2D ui_tex;
uniform int time;
in vec2 uvs;
out vec4 f_color;

vec2 noise2x2(vec2 p){
    float x = dot(p, vec2(123.4, 234.5));
    float y = dot(p, vec2(345.6, 456.7));
    vec2 noise = vec2(x,y);
    noise = sin(noise);
    noise = noise * 43758.5453;
    noise = fract(noise);
    return noise;
}

void main(){
    vec3 color = vec3(1.0);
    vec2 uv = uvs;
    uv = uv * 4.0;
    vec2 currentGridId = floor(uv);
    vec2 currentGridCoord = fract(uv);
    color = vec3(currentGridCoord, 0.0);
    currentGridCoord = currentGridCoord - 0.5;
    color = vec3(currentGridCoord, 0.0);
    vec2 redGridUv = currentGridCoord;
    redGridUv = abs(redGridUv);
    float distanceToEdgeOfGridCell = 2.0 *  max(redGridUv.x, redGridUv.y);
    color = vec3(distanceToEdgeOfGridCell);
    color = vec3(smoothstep(0.5, 1.0, distanceToEdgeOfGridCell));
    color = vec3(smoothstep(0.9, 1.0, distanceToEdgeOfGridCell), 0.0, 0.0);
    vec3 redGridColor = vec3(smoothstep(0.9, 1.0, distanceToEdgeOfGridCell), 0.0, 0.0);
    float pointsOnGrid = 0.0;
    float minDistFromPixel = 100.0;
    for (float i = -1.0; i <= 1.0; i++){
        for (float j = -1.0; j <= 1.0; j++){
            vec2 adjGridCoords = vec2(i,j);
            vec2 pointsOnAdjGrid = adjGridCoords;
            //pointsOnAdjGrid = adjGridCoords + sin(time) * 0.125;
            vec2 noise = noise2x2(currentGridId + adjGridCoords);
            pointsOnAdjGrid = adjGridCoords + sin(time * noise) * 0.125;
            float dist = length(currentGridCoord - pointsOnAdjGrid);
            minDistFromPixel = min(dist, minDistFromPixel);
            pointsOnGrid += smoothstep(0.95, 0.96, 1.0 - dist);
        }
    }
    vec3 pointsOnGridColor = vec3(pointsOnGrid);
    color = redGridColor + pointsOnGridColor;
    color = redGridColor + pointsOnGridColor + minDistFromPixel;
    color = vec3(smoothstep(0.0, 1.0, minDistFromPixel));
    color = vec3(smoothstep(0.2, 1.0, minDistFromPixel));
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