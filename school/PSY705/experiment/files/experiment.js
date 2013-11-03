var pulse_speed = 2000;
var step = -1;
var step_progress = false;
var step_start_time = 0;
var steps = [
    // from start be a little patient
    {dimensions: {x: 50, y: 20}, timeout: 5000}, // 1
    // then be patient not
    {dimensions: {x: 20, y: 50}, timeout: 600},   // 2
    {dimensions: {x: 90, y: 85}, timeout: 300},   // 3
    // after three quick two pretty slow and small
    {dimensions: {x: 10, y: 10}, timeout: 3000},  // 4
    {dimensions: {x: 80, y: 80}, timeout: 2000},  // 5
    // then put some big ones
    {dimensions: {x: 40, y: 40}, timeout: 800},  // 6
    {dimensions: {x: 20, y: 10}, timeout: 700},  // 7
    // and some small and quick again
    {dimensions: {x: 90, y: 90}, timeout: 3000},  // 8
    {dimensions: {x: 10, y: 10}, timeout: 330},   // 9
    {dimensions: {x: 60, y: 30}, timeout: 500},   // 10
    // then some good average set
    {dimensions: {x: 90, y: 10}, timeout: 800},   // 11
    {dimensions: {x: 20, y: 10}, timeout: 1000},  // 12
    {dimensions: {x: 10, y: 50}, timeout: 1200},  // 13
    {dimensions: {x: 50, y: 80}, timeout: 400},   // 14
    {dimensions: {x: 60, y: 30}, timeout: 900},   // 15
];

var results = $('<ul></ul>');
var times = [];

$(document).ready(function(){
    $('#start-button').click(function(event){
        event.preventDefault();
        start_experiment_loop();
    })
})

function start_experiment_loop(){
    $('body').animate({'background-color': '#666'}, 1000, 'swing');
    $('#start').hide().remove();
    $('body').keydown(handle_space_bar);
    timeout_render_next_step(0);
}

function timeout_render_next_step(i){
    if(i < steps.length)
        setTimeout(render_next_step, steps[i].timeout);
    else
        end_experiment_loop();
}

function end_experiment_loop(){
    var body = $('body');
    var end = $('<div class="center"><h1>Konec!</h1><h2>Výsledky:</h2></div>');
    log('AVERAGE # ' + avg(times)/1000 + 's');
    log('BEST # ' + Math.min.apply(null, times) / 1000 + 's');
    log('WORST # ' + Math.max.apply(null, times) / 1000 + 's');
    end.append(results);
    body.append(end);
    body.animate({'background-color': '#fff'});
}

function render_next_step(){
    if(step < 0) step = 0;
    step_progress = true;
    render_square(steps[step].dimensions);
    step_start_time = new Date();
}

function handle_space_bar(event){
    if(event.which == 32){
        fire_step();
    }
}

function print_step(i){
    if(step < 0 || i >= steps.length)
        return '--';
    return '[' + (i + 1) + ', ' + steps[i].timeout / 1000 + 's ]';
}

function note_step_time(step, miliseconds){
    times.push(miliseconds);
    log('POSITIVE ' + print_step(step) + ' # ' + miliseconds / 1000 + 's');
}
function note_step_time_failed(step, miliseconds){
    log('NEGATIVE ' + print_step(step) + ' # ' + miliseconds / 1000 + 's');
}

function sum(items){
    var sum = 0;
    for(var i = 0; i < items.length; i++){
        sum += parseInt(items[i]);
    }
    return sum;
}

function avg(items){
    if(items.length > 0)
        return sum(items) / items.length;
    return undefined;
}

function log(str){
    console.log(str);
    results.append($('<li>' + str + '</li>'));
}

function fire_step(){
    if(step_progress){
        remove_squares();
        step_progress = false;
        note_step_time(step, (new Date() - step_start_time));
        step ++;
        timeout_render_next_step(step);
    } else {
        if(step >= 0)
            note_step_time_failed(step, (new Date() - step_start_time));
        else
            note_step_time_failed(step, 0);
    }
}

//render_square({x: 100, y: 100}, '#ffcc00', 1000)
// by default place a red circle
function render_square(dimensions, colors){
    var speed = 500;
    if(colors === undefined) colors = {'from': "#f00", 'to': '#f44'};
    var body = $('body');
    var square = $('<div></div>').addClass('square');
    body.append(square);
    square.css('width', 50);
    square.css('height', 50);
    square.css('background-color', colors.from);
    square.css('top', '' + dimensions.y + '%');
    square.css('left', '' + dimensions.x + '%');
    square.show();
    square.animate({'background-color': colors.to}, speed, 'swing');
}

function remove_squares(){
    squares = $('.square');
    squares.hide();
    squares.remove();
}
