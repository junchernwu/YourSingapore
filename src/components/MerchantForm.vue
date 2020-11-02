<template>
  <div id="main">
    <h1>Register Your Attraction!</h1>
    <form>
      <!-- name and number -->
      <div class="form-row">
        <div class="col-name">
          <div class="input-focus">
            <input type="text" name = "name" placeholder="Attraction Name*" v-model="attraction.name">
          </div>
        </div>
        <div class="col-number">
          <div class="input-focus">
            <input type="tel" name = "number" placeholder="Contact Number*" v-model="attraction.number">
          </div>
        </div>
      </div>

      <!-- attraction description -->
      <div>
        <textarea name="description" rows="4" placeholder="Attraction Description*" v-model="attraction.description"></textarea>
      </div>

      <!-- upload image -->
      <div id="image">
        <label id="image-label">Upload Attraction Image</label>
        <input type="file" accept="image/png, image/jpeg" name="file-upload" value="file-upload" v-on:change="imgUpload">
      </div>

      <!-- operating hours -->
      <h4 style="text-align: left; margin: 5px 10px">Operating Hours:</h4>
      <!-- monday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="mon" name="mon" value="mon" v-model="attraction.operations.mon.open">
            <label class="form-check-label" for="mon">Monday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.mon.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.mon.start.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.mon.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.mon.end.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.mon.end.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.mon.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
      <!-- tuesday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="tue" name="tue" value="tue" v-model="attraction.operations.tue.open">
            <label class="form-check-label" for="tue">Tuesday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.tue.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.tue.start.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.tue.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.tue.end.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.tue.end.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.tue.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
      <!-- wednesday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="wed" name="wed" value="wed" v-model="attraction.operations.wed.open">
            <label class="form-check-label" for="wed">Wednesday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.wed.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.wed.start.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.wed.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.wed.end.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.wed.end.min">
              <option value="0">min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.wed.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
      <!-- thursday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="thur" name="thur" value="thur" v-model="attraction.operations.thu.open">
            <label class="form-check-label" for="thur">Thursday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.thu.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.thu.start.min">
              <option value="0" selected disabled>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.thu.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.thu.end.hour">
              <option value="" selected disabled>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.thu.end.min">
              <option value="0" selected disabled>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.thu.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
      <!-- friday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="fri" name="fri" value="fri" v-model="attraction.operations.fri.open">
            <label class="form-check-label" for="fri">Friday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.fri.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.fri.start.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.fri.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.fri.end.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.fri.end.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.fri.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
      <!-- saturday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="sat" name="sat" value="sat" v-model="attraction.operations.sat.open">
            <label class="form-check-label" for="sat">Saturday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.sat.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.sat.start.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.sat.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.sat.end.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.sat.end.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.sat.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
      <!-- sunday -->
      <div class="form-row">
        <div class="col-day">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="sun" name="sun" value="sun" v-model="attraction.operations.sun.open">
            <label class="form-check-label" for="sun">Sunday</label>
          </div>
        </div>
        <div class="col-time">
          <div class="start-time">
            <select class="dropdown" v-model="attraction.operations.sun.start.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.sun.start.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.sun.start.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="end-time">
            <select class="dropdown" v-model="attraction.operations.sun.end.hour">
              <option value="" disabled selected>Hour</option>
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
            <select class="dropdown" v-model="attraction.operations.sun.end.min">
              <option value="0" disabled selected>min</option>
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select class="dropdown" v-model="attraction.operations.sun.end.am">
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>

      <!-- weekdays -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="weekday" name="weekday" value="weekday" v-on:click="sameWeekday">
        <label class="form-check-label" for="weekday">Same Operating Hours on all Weekdays</label>
      </div>
      <!-- weekend -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="weekend" name="weekend" value="weekend" v-on:click="sameWeekend">
        <label class="form-check-label" for="weekend">Same Operating Hours on all Weekends</label>
      </div>
      <!-- everyday -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="everyday" name="everyday" value="everyday" v-on:click="sameEveryday">
        <label class="form-check-label" for="everyday">Same Operating Hours Everyday</label>
      </div>

      <!-- booking link -->
      <div class="input-focus">
        <input type="url" name = "link" placeholder="Booking Link" v-model="attraction.link">
      </div>
      <!-- promotion details -->
      <div class="input-focus">
        <textarea name="promotion" rows="2" placeholder="Promotion Details" v-model="attraction.promotions"></textarea>
      </div>

      <!-- pricing options -->
      <PricingOptions v-bind:attraction="attraction"></PricingOptions>

      <!-- Price Range -->
      <div class="select-options">
        <select name="price-range" id="price-range" v-model="attraction.pricerange">
          <option value="" disabled selected>Price Range</option>
          <option value="$0 - $20">$0 - $20</option>
          <option value="$20 - $50">$20 - $50</option>
          <option value="$50 - $100">$50 - $100</option>
          <option value="> $100">> $100</option>
        </select>
      </div>
      <!-- Location -->
      <div class="select-options">
        <select name="location" id="location" v-model="attraction.location">
          <option value="" disabled selected>Location</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
        </select>
      </div>
      <!-- Promotion Type -->
      <div class="select-options">
        <select name="promotion-type" v-model="attraction.promotiontype" multiple> <!--SHOULD CHANGE TO MULTI-SELECT!!!-->
          <option value="" disabled selected>Promotion Type</option>
          <optgroup label="Percentage">
            <option value="< 10%">&lt; 10%</option>
            <option value="10 - 20%">10 - 20%</option>
            <option value="> 20%">> 20%</option>
          </optgroup>
          <optgroup label="Absolute">
            <option value="< $20">&lt; $20</option>
            <option value="$20 - $50">$20 - $50</option>
            <option value="> $50">> $50</option>
          </optgroup>
          <optgroup label="Bundle Promotion">
            <option value="1 for 1">1 for 1</option>
            <option value="2 for 1">Buy 2 get 1 Free</option>
          </optgroup>
        </select>
      </div>
      <!-- Attraction Type -->
      <div class="select-options">
        <select name="attraction-type" v-model="attraction.attractionType" multiple> <!-- SHOULD CHANGE TO MULTI-SELECT!!!-->
          <option value="" disabled selected>Attraction Type</option>
          <optgroup label="Activity">
            <option value="Exhibitions">Exhibitions</option>
            <option value="Museum">Museum</option>
            <option value="Nature">Nature</option>
            <option value="Sightseeing">Sightseeing</option>
            <option value="Sports">Sports</option>
            <option value="Theme Parks">Theme Parks</option>
          </optgroup>
          <optgroup label="Demographic">
            <option value="Elderly">Elderly</option>
            <option value="Kids">Kids</option>
            <option value="Wheelchair-Friendly">Wheelchair-Friendly</option>
          </optgroup>
        </select>
      </div>

      <div class="submit">
        <button class="ui button" v-on:click.prevent="addItem">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import PricingOptions from "@/components/PricingOptions";
  import { database, storage } from "@/firebase/";
  // import storage from "@/firebase/";

  export default {
    components: {PricingOptions},
    data() {
      return {
        attraction: {
          auth_id: null,
          name: '',
          number: null,
          description: '',
          picture: '',
          operations: {
            mon: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
            tue: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
            wed: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
            thu: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
            fri: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
            sat: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
            sun: {
              open: false,
              start: {
                hour: '0',
                min: '0',
                am: 'am',
              },
              end: {
                hour: '0',
                min: '0',
                am: 'am',
              },
            },
          },
          link: '',
          promotions: '',
          pricing: {},
          pricerange: '',
          location: '',
          promotiontype: '',
          attractionType: '',
          bump: {
          date: '',
          status: false,
          },      
          bumpTimes: 0,
          bumpViews: 0,
          notBumpViews: 0,
          dateAdded: '',
          stats:{},
          arrivals:{},
        },
        weekday: false,
        weekend: false,
        everyday: false,
      }
    },
    methods: {
      checkOperatingHourFilled(){
        if (this.attraction.operations.mon.open == true && (this.attraction.operations.mon.start.hour == '' || this.attraction.operations.mon.end.hour == '')) {
          return false;
        } else if (this.attraction.operations.tue.open == true && (this.attraction.operations.tue.start.hour == '' || this.attraction.operations.tue.end.hour == '')) {
          return false;
        } else if (this.attraction.operations.wed.open == true && (this.attraction.operations.wed.start.hour == '' || this.attraction.operations.wed.end.hour == '')) {
          return false;
        } else if (this.attraction.operations.thu.open == true && (this.attraction.operations.thu.start.hour == '' || this.attraction.operations.thu.end.hour == '')) {
          return false;
        } else if (this.attraction.operations.fri.open == true && (this.attraction.operations.fri.start.hour == '' || this.attraction.operations.fri.end.hour == '')) {
          return false;
        } else if (this.attraction.operations.sat.open == true && (this.attraction.operations.sat.start.hour == '' || this.attraction.operations.sat.end.hour == '')) {
          return false;
        } else if (this.attraction.operations.sun.open == true && (this.attraction.operations.sun.start.hour == '' || this.attraction.operations.sun.end.hour == '')) {
          return false;
        }else {
          return true;
        }
      },
      checkNameFilled(){
        return (this.attraction.name != '')
      },
      checkNumberFilled(){
        return (this.attraction.number != null)
      },
      checkDescriptionFilled(){
        return (this.attraction.description != '')
      },
      checkImageUploaded(){
        return (this.attraction.picture != '')
      },
      addItem(){
        console.log()
        console.log(this.checkOperatingHourFilled())
        if (this.checkNameFilled() == false) {
          alert("Please Fill Up the Attraction's Name")
        } else if (this.checkNumberFilled() == false) {
          alert("Please Fill Up the Attraction's Contact Number")
        } else if (this.checkDescriptionFilled() == false) {
          alert("Please Fill Up the Attraction's Description")
        } else if (this.checkImageUploaded() == false) {
          alert("Please Upload the Attraction's Image")
        } else if (this.checkOperatingHourFilled() == false) {
          alert("Please Fill Up the Attraction's Operating Hours")
        } else {
          this.attraction.dateAdded = new Date();
          database.collection('attraction2').add(this.attraction)
          alert('Submitted')
          this.attraction = {
            auth_id: null,
            name: '',
            number: null,
            description: '',
            picture: '',
            operations: {
              mon: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
              tue: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
              wed: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
              thu: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
              fri: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
              sat: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
              sun: {
                open: false,
                start: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
                end: {
                  hour: '0',
                  min: '0',
                  am: 'am',
                },
              },
            },
            link: '',
            promotions: '',
            pricing: {},
            pricerange: '',
            location: '',
            promotiontype: '',
            attractionType: '',
            bump: {
              date: '',
              status: false,
            },
            bumpTimes: 0,
            bumpViews: 0,
            notBumpViews: 0,
            dateAdded: '',
            stats: {},
            arrivals:{}
          },
          this.weekday = false;
          this.weekend = false;
          this.everyday = false;
          this.$router.push('/verification')
        }
      },
      sameWeekday(){
        console.log("SAME WEEKDAY")
        // MAKE ALL WEEKDAYS SAME AS MONDAY
        if (this.weekday == false) {
          this.weekday = true;
          this.attraction.operations.tue = this.attraction.operations.mon;
          this.attraction.operations.wed = this.attraction.operations.mon;
          this.attraction.operations.thu = this.attraction.operations.mon;
          this.attraction.operations.fri = this.attraction.operations.mon;
        } else {
          this.weekday = false;
          this.attraction.operations.tue = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.wed = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.thu = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.fri = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
        }
      },
      sameWeekend(){
        console.log("SAME WEEKEND")
        // MAKE SUNDAY SAME AS SATURDAY
        if (this.weekend == false) {
          this.weekend = true
          this.attraction.operations.sun = this.attraction.operations.sat;
        } else {
          this.weekend = false;
          this.attraction.operations.sun = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
        }
      },
      sameEveryday(){
        console.log("SAME EVERYDAY")
        // MAKE ALL DAYS SAME AS MONDAY
        if (this.everyday == false) {
          this.everyday = true;
          this.attraction.operations.tue = this.attraction.operations.mon;
          this.attraction.operations.wed = this.attraction.operations.mon;
          this.attraction.operations.thu = this.attraction.operations.mon;
          this.attraction.operations.fri = this.attraction.operations.mon;
          this.attraction.operations.sat = this.attraction.operations.mon;
          this.attraction.operations.sun = this.attraction.operations.mon;
        } else {
          this.everyday = false;
          this.attraction.operations.tue = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.wed = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.thu = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.fri = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.sat = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
          this.attraction.operations.sun = {
            open: false,
            start: {
              hour: '0',
              min: '0',
              am: 'am',
            },
            end: {
              hour: '0',
              min: '0',
              am: 'am',
            },
          };
        }
      },
      imgUpload(e){
        var attraction = this.attraction;

        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        console.log("DATABASE: " + database);
        console.log("STORAGE: " + storage);
        var storageRef = storage.ref();
        var attractionRef = storageRef.child('images/attractions/' + uuid);
        var files = e.target.files;
        var image = files[0];

        attractionRef.put(image).then(function() {
          attractionRef.getDownloadURL().then(function (result){
            attraction.picture = result;
          });
        });
      }
    },
    mounted() {
      if (sessionStorage.uid) {
        this.attraction.auth_id = sessionStorage.uid;
        console.log("UID")
        console.log(this.auth_id)
      }
    },

  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    position: absolute;
    left: 25%;
  }

  .col-name {
    float: left;
    width: 50%;
  }
  .col-number {
    float: right;
    width: 50%;
  }
  .input-focus {
    border-color: #85B7D9;
    width: 100%;
  }
  input, textarea {
    line-height: 1.5em;
    padding: 5px 10px;
    margin: 5px 10px;
    width: calc(100% - 20px);
    resize: none;
    font-size: 14px;
    font-family: Avenir;
    vertical-align: middle;
    border-width: 1px;
    box-sizing: border-box;
  }

  /* attraction img */
  #image {
    padding: 5px 10px;
  }

  #image-label {
    float: left;
    width: 35%;
    padding: 8px 5px 5px 0px;
    margin: 0;
    text-align: left;
  }

  #image input {
    margin: 0;
    padding-right: 0;
    float: right;
    width: 60%;
    text-align: right;
    direction: rtl;
  }

  /* operating hours styling */
  .col-day {
    float: left;
    width: 30%;
  }
  .form-check {
    position: relative;
    left: 0;
    width: 100%;
    margin-right: 10px;
  }
  .form-check-input {
    float: right;
    position: absolute;
    right: 0;
    top: 0.6rem;
    margin-top: 0;
    margin-right: 10px;
    width: 10px;
  }
  .form-check-label {
    float: left;
    width: calc(100% - 30px);
    margin: 5px 10px;
    text-align: left;
  }
  .col-time {
    float: right;
    width: calc(70% - 20px);
    margin: 5px 10px;
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

  /* select options styling */
  .select-options {
    width: calc(100% - 30px);
    margin: 10px 15px 0px;
    height: 2em;
    background-color: rgba(255,248,248,0.2);
    border-radius: 20px;
  }
  .select-options select {
    width: calc(100% - 20px);

    padding: 5px;
    background-color: transparent;
    border: none;
    color: white;
  }

  /* submit button styling */
  .submit {
    margin: 20px 15px;
  }
  .ui.button {
    float: right;
  }
</style>
