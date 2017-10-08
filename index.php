<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/materialize.min.css">
</head>
<body>
<input type="hidden" id="dashboarssprintgenerate">
<nav id="header">
  <div class="nav-wrapper">
    <a href="./" class="brand-logo center">
    <img src="./images/icon.png" alt="">
    <span class="title">Sprint User Finder</span>
    </a>

      <ul id="nav-mobile" class="account_ right hide-on-med-and-down">
        <li>Account To Login</li>
        <li><input type="text" id="account_name" class="input-z" placeholder="account username" data-autosave></li>
        <li> <input type="text" id="account_password" class="input-z" placeholder="account Password" data-autosave></li>
      </ul>



  </div>
</nav>

  <div class="account_">

  </div>

 <div class="row">


    <div>
      <ul class="tabs">
        <li class="tab col s6"><a href="#test1">New Accounts</a></li>
        <li class="tab col s6"><a href="#test2">Saved Account</a></li>
      </ul>
    </div>


    <div id="test1" class="col s12">

        <br>
          <div class="col s12">
            <div class="col ">
              <input type="text" id="username" class="input-z" placeholder="Type Username" data-autosave>
              <a id="start" class="waves-effect waves-light btn red"><i class="material-icons left">search</i>Run</a>
            </div>

            <div class="col">
              <label for="init" class="label-z">Initial:</label>
              <input type="number" name="init" id="init" class="input-z" placeholder="Type Username" value="0" data-autosave>
            </div>

            <div class="col">
              <label for="limit" class="label-z">Limit:</label>
              <input type="number" name="limit" id="limit" class="input-z" value="100" data-autosave>
            </div>

            <div class="col">
              <span><pre>{{UP}} = Number increment ( Initial to Limit ). Example: smith_{{UP}} =  smith_0, smith_1, etc... </pre></span>
            </div>

          </div>

          <div id="admin" class="col s6">
            <div class="card material-table">
              <div class="table-header">
                <span class="table-title">Client Normal</span>
                <div class="actions">
                  <a href="#" class="search-toggle waves-effect btn-flat nopadding"><i class="material-icons">search</i></a>
                </div>
              </div>
              <table id="datatable" class="datatable" data-name="normal">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>

                  

                </tbody>
              </table>
            </div>
          </div>

          <div id="admin" class="col s6">
            <div class="card material-table">
              <div class="table-header">
                <span class="table-title">Bussines</span>
                <div class="actions">
                  <a id="start" href="#" class="search-toggle waves-effect btn-flat nopadding"><i class="material-icons">search</i></a>
                </div>
              </div>
              <table id="datatable" class="datatable" data-name="bussines">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>

                  

                </tbody>
              </table>
            </div>
          </div>

      </div>



    <div id="test2" class="col s12">



          <div id="admin" class="col s6">
            <div class="card material-table">
              <div class="table-header">
                <span class="table-title">Client Normal</span>
                <div class="actions">
                  <a href="#" class="search-toggle waves-effect btn-flat nopadding"><i class="material-icons">search</i></a>
                </div>
              </div>
              <table id="datatable" class="datatable" data-name="savednormal">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>

                  

                </tbody>
              </table>
            </div>
          </div>

          <div id="admin" class="col s6">
            <div class="card material-table">
              <div class="table-header">
                <span class="table-title">Bussines</span>
                <div class="actions">
                  <a id="start" href="#" class="search-toggle waves-effect btn-flat nopadding"><i class="material-icons">search</i></a>
                </div>
              </div>
              <table id="datatable" class="datatable" data-name="savedbussines">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>

                  

                </tbody>
              </table>
            </div>
          </div>

      </div>





</div>


  <!-- Modal Structure -->
  <div id="account_set" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>


  <div class="loader" style="display: none;">
     <div class="line">
       <div class="progress">
          <div class="indeterminate"></div>
      </div>
     </div>

     <div class="circle">
       <div class="preloader-wrapper small  active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
     </div>

  </div>


  <!-- Modal Structure -->
  <div id="lote" class="modal bottom-sheet">

    <div class="modal-content">
    
    <div class="col s12">
      <div class="col"> <h5>Progress by Lot</h5></div>
    <div class="col"><a href="#!" class="btn modal-action modal-close waves-effect waves-green btn-flat yellow">Cerrar</a></div>
    </div>

     <ul class="collection" id="lotes">
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
      <li class="collection-item">Alvin</li>
    </ul>

    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat yellow">Cerrar</a>
    </div>
  </div>

  <div class="fixed left"></div>

  <script src="./js/jquery.js"></script>
  <script src="./js/jquery.dataTables.min.js"></script>
  <script src="./js/materialize.min.js"></script>
  <script src="./js/custom.js"></script>
  <script src="./js/app.js"></script>
</body>
</html>