<template>
  <div class="main">
    <div class="left">
      <div id="image">
        <label id="image-label">To Replace Attraction photo</label>
        <br />
        <input
          :style="{textAlign: 'center', border: 'none', position: 'relative', left: '-15px'}"
          type="file"
          accept="image/png, image/jpeg"
          name="file-upload"
          value="file-upload"
          v-on:change="imgUpload"
        />
      </div>

      <img v-bind:src="attractions.picture" />

      <input
        id="input_title"
        v-if="title_edit"
        v-model="attractions.name"
        @keyup.enter="
          title_edit = false;
          $emit('update');
        "
      />
      <div v-else>
        <h1 @click="title_edit = true" id="title">{{ attractions.name }}</h1>
      </div>

      <p id="desc">{{ attractions.description }}</p>
      <h3 :style="{marginBottom: '2px'}">Address :</h3>
      <input
        id="address"
        v-if="address_edit"
        v-model="attractions.address"
        @keyup.enter="
          address_edit = false;
          $emit('update');
        "
      />
      <div v-else>
        <h4 @click="address_edit = true" id="desc">
          {{ attractions.address }}
        </h4>
      </div>
    </div>
    <div class="right">
      <div class="buttonRow">
        <button class="ui button" v-on:click="update_changes"
                :style="{color: 'white', backgroundColor: 'rgb(255, 46, 81)', borderRadius: '10px', padding: '8px 15px', marginRight: '10px', marginLeft: '5px', marginBottom: '5px'}"
        >
          SAVE
        </button>
        <button class="ui button" v-on:click="bump" :style="bumpStyle">
          BUMP
        </button>
        <button
            class="ui button"
            :style="{color: 'white', backgroundColor: 'rgb(255, 46, 81)', borderRadius: '10px', padding: '8px 15px', marginRight: '10px', marginBottom: '5px'}"
            v-on:click="$router.push({ name: 'dashboard', query: { docId: doc_id }})"
        >
          DASHBOARD
        </button>
      </div>

      <div class="box time" id="box2">
        <h1 id="righttitle">Operating hours</h1>

        <!-- MONDAY -->
        <div class="form-row" v-if="editedTodo">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="mon" name="mon" value="mon" v-model="attractions.operations.mon.open">
              <label class="form-check-label" for="mon">Monday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.mon.start.hour" @keyup.enter="RevertMonday(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.mon.start.min" @keyup.enter="RevertMonday(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.mon.start.am" @keyup.enter="RevertMonday(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.mon.end.hour">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.mon.end.min">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.mon.end.am">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Monday_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Monday</label>
            </div>
          </div>
          <div class="col-time">
            <div v-if="attractions.operations.mon.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.mon.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.mon.start.min}}</p>
                <p class="dropdown">{{attractions.operations.mon.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.mon.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.mon.end.min}}</p>
                <p class="dropdown">{{attractions.operations.mon.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p :style="{}">Not Open</p>
              </div>
            </div>
          </div>
        </div>

        <!-- TUES -->
        <div class="form-row" v-if="editedTodo_tues">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="tue" name="tue" value="tue" v-model="attractions.operations.tue.open">
              <label class="form-check-label" for="tue">Tuesday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.tue.start.hour" @keyup.enter="RevertTues(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.tue.start.min" @keyup.enter="RevertTues(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.tue.start.am" @keyup.enter="RevertTues(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.tue.end.hour">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.tue.end.min">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.tue.end.am">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Tues_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Tuesday</label>
            </div>
          </div>
          <div class="col-time">
            <div v-if="attractions.operations.tue.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.tue.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.tue.start.min}}</p>
                <p class="dropdown">{{attractions.operations.tue.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.tue.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.tue.end.min}}</p>
                <p class="dropdown">{{attractions.operations.tue.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>

        <!-- WEDNESDAY -->
        <div class="form-row" v-if="editedTodo_wed">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="wed" name="wed" value="wed" v-model="attractions.operations.wed.open">
              <label class="form-check-label" for="wed">Wednesday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.wed.start.hour" @keyup.enter="RevertWed(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.wed.start.min" @keyup.enter="RevertWed(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.wed.start.am" @keyup.enter="RevertWed(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.wed.end.hour" @keyup.enter="RevertWed(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.wed.end.min" @keyup.enter="RevertWed(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.wed.end.am" @keyup.enter="RevertWed(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Wed_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Wednesday</label>
            </div>
          </div>

          <div class="col-time">
            <div v-if="attractions.operations.wed.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.wed.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.wed.start.min}}</p>
                <p class="dropdown">{{attractions.operations.wed.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.wed.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.wed.end.min}}</p>
                <p class="dropdown">{{attractions.operations.wed.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>

        <!-- THURSDAY -->
        <div class="form-row" v-if="editedTodo_thurs">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="thu" name="thu" value="thu" v-model="attractions.operations.thu.open">
              <label class="form-check-label" for="thu">Thursday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.thu.start.hour" @keyup.enter="RevertThurs(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.thu.start.min" @keyup.enter="RevertThurs(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.thu.start.am" @keyup.enter="RevertThurs(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.thu.end.hour" @keyup.enter="RevertThurs(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.thu.end.min" @keyup.enter="RevertThurs(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.thu.end.am" @keyup.enter="RevertThurs(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Thurs_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Thursday</label>
            </div>
          </div>
          <div class="col-time">
            <div v-if="attractions.operations.thu.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.thu.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.thu.start.min}}</p>
                <p class="dropdown">{{attractions.operations.thu.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.thu.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.thu.end.min}}</p>
                <p class="dropdown">{{attractions.operations.thu.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FRIDAY -->
        <div class="form-row" v-if="editedToDo_fri">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="fri" name="fri" value="fri" v-model="attractions.operations.fri.open">
              <label class="form-check-label" for="fri">Friday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.fri.start.hour" @keyup.enter="RevertFri(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.fri.start.min" @keyup.enter="RevertFri(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.fri.start.am" @keyup.enter="RevertFri(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.fri.end.hour" @keyup.enter="RevertFri(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.fri.end.min" @keyup.enter="RevertFri(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.fri.end.am" @keyup.enter="RevertFri(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Fri_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Friday</label>
            </div>
          </div>
          <div class="col-time">
            <div v-if="attractions.operations.fri.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.fri.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.fri.start.min}}</p>
                <p class="dropdown">{{attractions.operations.fri.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.fri.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.fri.end.min}}</p>
                <p class="dropdown">{{attractions.operations.fri.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SATURDAY -->
        <div class="form-row" v-if="editedToDo_sat">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="sat" name="sat" value="sat" v-model="attractions.operations.sat.open">
              <label class="form-check-label" for="sat">Saturday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.sat.start.hour" @keyup.enter="RevertSat(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sat.start.min" @keyup.enter="RevertSat(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sat.start.am" @keyup.enter="RevertSat(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.sat.end.hour" @keyup.enter="RevertSat(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sat.end.min" @keyup.enter="RevertSat(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sat.end.am" @keyup.enter="RevertSat(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Sat_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Saturday</label>
            </div>
          </div>
          <div class="col-time">
            <div v-if="attractions.operations.sat.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.sat.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.sat.start.min}}</p>
                <p class="dropdown">{{attractions.operations.sat.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.sat.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.sat.end.min}}</p>
                <p class="dropdown">{{attractions.operations.sat.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SUNDAY -->
        <div class="form-row" v-if="editedToDo_sun">
          <div class="col-day">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="sun" name="sun" value="sun" v-model="attractions.operations.sun.open">
              <label class="form-check-label" for="sun">Sunday</label>
            </div>
          </div>
          <div class="col-time">
            <div class="start-time">
              <select class="dropdown" v-model="attractions.operations.sun.start.hour" @keyup.enter="RevertSun(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sun.start.min" @keyup.enter="RevertSun(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sun.start.am" @keyup.enter="RevertSun(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
            <div class="end-time">
              <select class="dropdown" v-model="attractions.operations.sun.end.hour" @keyup.enter="RevertSun(); $emit('update');">
                <option value="" disabled>Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sun.end.min" @keyup.enter="RevertSun(); $emit('update');">
                <option value="0" disabled>min</option>
                <option value="00">00</option>
                <option value="30">30</option>
              </select>
              <select class="dropdown" v-model="attractions.operations.sun.end.am" @keyup.enter="RevertSun(); $emit('update');">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row" v-else @click="Sun_click">
          <div class="col-day">
            <div class="form-check">
              <label :style="{marginLeft: '10px'}">Sunday</label>
            </div>
          </div>
          <div class="col-time">
            <div v-if="attractions.operations.sun.open">
              <div class="start-time">
                <p class="dropdown">{{attractions.operations.sun.start.hour}}</p>
                <p class="dropdown">{{attractions.operations.sun.start.min}}</p>
                <p class="dropdown">{{attractions.operations.sun.start.am}}</p>
              </div>
              <div class="end-time">
                <p class="dropdown">{{attractions.operations.sun.end.hour}}</p>
                <p class="dropdown">{{attractions.operations.sun.end.min}}</p>
                <p class="dropdown">{{attractions.operations.sun.end.am}}</p>
              </div>
            </div>
            <div v-else>
              <div :style="{textAlign: 'left', position: 'relative', left: 'calc(50% - 150px)'}">
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="box price" id="box3">
        <button id="addbutton" v-on:click="newPrice()" type="button">
          <h3>Pricing Options</h3>
          <p id="plus">&#8853;</p>
        </button>

        <ul>
          <li v-for="(field, index) in attractions.pricing" v-bind:key="index">
            <div id="total">
              <div id="button">
                <button v-on:click="deleteOption(index)" type="button">
                  x
                </button>
              </div>
              <div id="price">
                <input
                  class="catfield_input"
                  v-if="price_edit"
                  v-model="field.category"
                  @keyup.enter="
                    price_edit = false;
                    $emit('update');
                  "
                />
                <br />
                <input
                  class="pricefield_input"
                  v-if="price_edit"
                  type="text"
                  v-model="field.price"
                  @keyup.enter="
                    price_edit = false;
                    $emit('update');
                  "
                />
                <div @click="price_edit = true" v-else>
                  <p id="valueCategory">{{ field.category }}</p>
                  <p id="valuePrice">{{ field.price }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="box" id="box4" @click="promo_edit = true">
        <h1 id="righttitle">Promotions</h1>
        <textarea
            rows="4"
            v-if="promo_edit"
            v-model="attractions.promotions"
            @keyup.enter="
              promo_edit = false;
              $emit('update');
            "
        />
        <div v-else id="promoDetails">
          <p>{{ attractions.promotions }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "@/firebase/";
import firebase from "firebase";
import { storage } from "@/firebase/";
export default {
  data() {
    return {
      curr: 0,
      attractions: null,
      attractionId: this.$route.params.merchantId,
      editedTodo: null,
      editedTodo_tues: null,
      editedTodo_wed: null,
      editedTodo_thurs: null,
      editedToDo_fri: null,
      editedToDo_sat: null,
      editedToDo_sun: null,
      title_edit: null,
      price_edit: null,
      address_edit: null,
      doc_id: null,
      promo_edit: null,
      bumped: null,
    };
  },

  beforeCreate: function() {
    document.body.className = "details";
  },

  created() {
    this.fetchItems();
  },

  computed: {
    bumpStyle() {
      if (this.bumped == true) {
        return {
          'color': 'white',
          'borderRadius': '10px',
          'padding': '10px 20px',
          'marginRight': '10px',
          'marginBottom': '5px',
          "background-color": "grey",
        };
      } else {
        return {
          'color': 'white',
          'borderRadius': '10px',
          'padding': '8px 15px',
          'marginRight': '10px',
          'marginBottom': '5px',
          "background-color": "rgb(255, 46, 81)",
        };
      }
    },
  },

  methods: {
    imgUpload(e) {
      var files = e.target.files;
      var image = files[0];
      console.log("IMAGE");
      console.log(image);
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      var storageRef = storage.ref();
      var attractionRef = storageRef.child("images/attractions/" + uuid);
      var new_pic = this.attractions.picture 
    
      attractionRef.put(image).then(() => {
        
        attractionRef
          .getDownloadURL()
          .then(result => {
            console.log("after reassignment");
            new_pic = result;
            
            this.attractions.picture = new_pic
            console.log(this.attractions.picture);

          });
      })


    },
    deleteOption: function(index) {
      console.log("DELETING");
      console.log(this.attractions.pricing);
      console.log(index);
      delete this.attractions.pricing[index];
      this.$forceUpdate();
    },
    newPrice: function() {
      var prev = Object.keys(this.attractions.pricing);
      if (prev.length < 3) {
        var key = Math.random();
        while (key in prev) {
          key = Math.random();
        }

        this.attractions.pricing[key] = { category: "CATEGORY", price: "$$$" };
        this.num_of_adds += 1;

        this.$forceUpdate();
      } else {
        alert("Please limit prices to 3 categories");
      }
    },
    fetchItems: function() {
      console.log("INITIATE FIREBASE");
      if (firebase.auth().currentUser) {
        database
          .collection("attraction2")
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.data();
              var match = this.$route.params.merchantId;
              if (item.auth_id == match) {
                this.doc_id = doc.id;
                this.attractions = item;
                console.log("WORKS");
                console.log(this.attractions);
                this.bumped = this.attractions.bump.status;
                console.log("CHECK BUMP: " + this.bumped);
                this.checkRemovedBump();
              }
            });
          });
      } else {
        alert("Unauthorised Access. Please Login");
        this.$router.push("/login");
      }
    },
    checkRemovedBump: function() {
      if (this.bumped == true) {
        if (new Date() > this.attractions.bump.date.toDate().getTime() + 300000) {
          this.removeBump();
        }
      }
    },
    Monday_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo = true;
      }
    },
    RevertMonday: function() {
      this.curr = 0;
      this.editedTodo = false;
    },
    Tues_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo_tues = true;
      }
    },
    RevertTues: function() {
      this.curr = 0;
      this.editedTodo_tues = false;
    },
    Wed_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo_wed = true;
      }
    },
    RevertWed: function() {
      this.curr = 0;
      this.editedTodo_wed = false;
    },
    Thurs_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo_thurs = true;
      }
    },
    RevertThurs: function() {
      this.curr = 0;
      this.editedTodo_thurs = false;
    },
    Fri_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedToDo_fri = true;
      }
    },
    RevertFri: function() {
      this.curr = 0;
      this.editedToDo_fri = false;
    },
    Sat_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedToDo_sat = true;
      }
    },
    RevertSat: function() {
      this.curr = 0;
      this.editedToDo_sat = false;
    },
    Sun_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedToDo_sun = true;
      }
    },
    RevertSun: function() {
      this.curr = 0;
      this.editedToDo_sun = false;
    },

    update_changes: function() {
      var id = this.doc_id;
      var updated = this.attractions;

      database
        .collection("attraction2")
        .doc(id)
        .set(updated)
        .then(console.log("SET"))
        .then(alert("Succesfully updated attraction's details"));
      this.title_edit = false;
      this.RevertMonday();
      this.RevertTues();
      this.RevertWed();
      this.RevertThurs();
      this.RevertFri();
      this.RevertSat();
      this.RevertSun();
      this.price_edit = false
      this.promo_edit = false
      this.address_edit = false

    },
    bump: function() {
      if (this.bumped == false) {
        console.log("BUMP");
        this.bumped = true;
        var id = this.doc_id;
        database
          .collection("attraction2")
          .doc(id)
          .update({
            bump: {
              status: true,
              date: new Date(),
            },
            bumpTimes: firebase.firestore.FieldValue.increment(1),
          });
        // NOTE: TESTED FOR 11 MINUTES
        // 7 Days: 86400000
        setTimeout(this.removeBump, 300000);
      } else {
        alert("Attraction can only be bumped once every 7 days");
      }
    },
    removeBump: function() {
      // check date vs bumped date (BASED ON 1 MIN)
      this.bumped = false;
      var id = this.doc_id;
      database
        .collection("attraction2")
        .doc(id)
        .update({
          bump: {
            status: false,
            date: "",
          },
        });
      console.log("REMOVED BUMP");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 100%;
}
.left {
  float: left;
  padding-left: 4%;
  padding-top: 4%;
  width: 50%;
  overflow: hidden;
}
.right {
  float: left;
  color: white;
  width: 50%;
  overflow: hidden;
  padding-left: 5%;
  padding-top: 4%;
}
img {
  border-radius: 10px;
  width: 100%;
}
#input_title {
  background-color: transparent;
  color: white;
  font-weight: lighter;
  border-bottom: solid;
  border-color: white;
  font-size: 40px;
  float: left;
  clear: both;
}
.catfield_input {
  background-color: transparent;
  width: calc(85% - 12px);
  margin: 5px 0px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15px;
  padding-right: 3px;
  text-align: center;
  position: relative;
  left: -12px;
  top: 10px;
}
.pricefield_input {
  background-color: transparent;
  width: calc(85% - 12px);
  margin-bottom: 2%;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15px;
  padding-right: 3px;
  text-align: center;
  position: relative;
  top: 10px;
}

#title {
  color: white;
  font-weight: lighter;
  border-bottom: solid;
  border-color: white;
  border-width: 1px;
  padding-bottom: 5px;
  font-size: 40px;
}
#desc {
  color: rgba(244, 245, 245, 0.705);
}

a,
button {
  background-color: rgb(255, 46, 81);
  color: white;
  padding: 5px;
  border-radius: 20px;
  font-weight: bolder;
  margin-right: 10px;
  font-size: 10px;
  border: none;
}

.box {
  background-color: rgba(0, 0, 0, 0.342);
  width: 90%;
  padding-left: 3%;
  padding-top: 2%;
  padding-bottom: 5%;
  border-radius: 10px;
  margin-bottom: 2%;
}
#righttitle {
  font-size: 20px;
  font-weight: lighter;
}

.innerbox {
  background-color: rgba(82, 82, 100, 0.554);
  width: 90%;
  border-radius: 30px;
  padding-left: 8%;
  padding-top: 1%;
  padding-bottom: 1%;
}
#dropdown {
  background: transparent;
  color:white;
}
#datetitle {
  float: left;
  width: 50%;
  color: gray;
}
#date {
  color: gray;
}

.price ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-right: 5%;
  text-align: left;
  margin-left: -45px;
}

#time {
  margin-top: -10px;
}
#timetitle {
  float: left;
  width: 50%;
  margin-top: -10px;
}
#planneradd {
  position: relative;
  top: 10px;
  left: 410px;
}
.price ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 5px;
  text-align: left;
  margin: 0;
}
.price li {
  flex-grow: 1;
  flex-basis: 20px;
  height: 150px;
  border-radius: 10px;
  text-align: center;
  padding: 5px 10px;
  margin: 10px;
  background-color: rgba(82, 82, 100, 0.554);
}
#price {
  position: relative;
  top: 25px;
}
#valueCategory {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 30px;
  line-height: 10px;
  position: relative;
  left: -0.3em;
  text-align: center;
  white-space: nowrap;
  margin-right: 20px;
  margin-left: 5px;
}

#valuePrice {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 30px;
  line-height: 10px;
  position: relative;
  left: 0.1em;
  text-align: center;
}

#address {
  font-size: 14px;
  float: left;
  position: relative;
  left: -10px;
  top: -10px;
  text-align: left;
}
.time ul {
  list-style-type: none;
  display: flex;
  position: relative;
  margin-right: 330px;
}
.time li {
  padding-left: 5px;
}
.leftt {
  float: left;
  width: 50%;
}
.rightt {
  float: left;
  width: 50%;
}
#box2 {
  height: 240px;
}

input {
  background-color: transparent;
  color: white;
  border: 1px solid lightblue;
  padding: 5px 10px;
  margin: 5px 10px;
  width: calc(100% - 40px);
  text-align: center;
}

textarea {
  background-color: transparent;
  color: white;
  border: 1px solid lightblue;
  padding: 5px 10px;
  margin: 5px 10px;
  width: calc(100% - 40px);
  text-align: left;
}

::placeholder {
  color: white;
  text-align: center;
}
#field {
  float: left;
  position: relative;
  width: calc(100% - 35px);
  left: calc(6% - 3px);
  padding-top: 15px;
  padding-bottom: 15px;
}
#button {
  float: left;
  position: relative;
  top: 5px;
  left: 5px;
}
button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
}
.category {
  font-weight: bold;
  font-size: 18px;
  width: 7em;
}
#addbutton {
  font-size: 26px;
  width: 100%;
  float: right;
}

#plus {
  float: right;
}
button h3 {
  float: left;
}
select{
  background-color: transparent;
  color: white;
}
select option{
  color:white;
}
#promoDetails {
  padding: 5px 30px 5px 5px;
}

/* operating hours styling */
.col-day {
  float: left;
  width: 25%;
  margin-top: 5px;
}
.form-row {
  width: 100%;
  height: 20px;
}
.form-check {
  left: 0;
  width: 100%;
  margin-right: 10px;
  position: relative;
  top: 0px;
}
.form-check-input {
  float: right;
  position: relative;
  right: 0;
  top: 0.3rem;
  margin-top: 0;
  margin-right: 10px;
  width: 10px;
}
.form-check-label {
  float: left;
  width: 50%;
  margin: 0px 10px;
  text-align: left;
}
.col-time {
  float: right;
  width: calc(75% - 30px);
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 20px;
}
.start-time {
  float: left;
  width: 50%;
  display: flex;
  justify-content: flex-end;
}
.end-time {
  float: right;
  position: relative;
  width: 50%;
  display: flex;
  justify-content: flex-end;
}
.dropdown {
  width: 50px;
  margin: 0px;
}
</style>
