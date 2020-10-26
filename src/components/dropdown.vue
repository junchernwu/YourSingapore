 <template>
  <div id="main">
  
<div class="ui labeled input">
  <span class="ui label">Colour:</span>
  <select class="ui compact dropdown" >
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
  <span class="ui label">Display:</span>
  <select name="display" class="ui dropdown" multiple>
    <option value="1">Item 1</option>
    <option value="2">Item 2</option>
    <option value="3">Item 3</option>
  </select>
</div>

    </div>
</template>

<script>
  import $ from "jquery";
  export default {
    mounted() {
      $(document).ready(function($){
          $('dropdown')
          .dropdown()
          });

    }

  }

</script>

