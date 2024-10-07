$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("pid"));
    var pokemonId = urlParams.get("pid");

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+ pokemonId +"/",
        method: "GET",
      }).done(function (resp) {
          $("#data-content").html("");
          var typesHtml = '';
          var typeInfo = resp.types;
          //debugger;
            typeInfo.forEach(function (typeInfo) {
            typesHtml += `<span class="badge bg-light text-dark">${typeInfo.type.name}</span> `;
            //debugger;
            });
            var template = `
            <div class="card mx-auto caja-ppal my-4">
            <div class="card-header text-center ">
                <h5 class="card-title mb-0">${resp.name} Nº${pokemonId}</h5>
            </div>
            <div class="card-body text-center">
                <div>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png"
                        alt="Foto de ${resp.name}" class="img-fluid float-start fotoPokemon">
                </div>

                <ul class="list-group mt-3">
                    <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Altura:</strong>
                        ${resp.height} dm</li>
                    <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Categoria:
                        </strong>${resp.species.name}</li>
                    <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Peso:</strong>
                        ${resp.weight} kg</li>
                </ul>
                <div class="container-fluid">
                    <h6 class="col-6 just">Ataques:</h6>
                    <div class="col-12 btn-group borde-habilidades" role="group" aria-label="Ataques">
                        <button type="button" class="btn btn-especial fw-bold">Derribo</button>
                        <button type="button" class="btn btn-especial fw-bold">Somnífero</button>
                        <button type="button" class="btn btn-especial fw-bold">Ver más</button>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row text-center">
                    <div class="col-12">
                        <h6>Tipo</h6>
                        ${typesHtml}
                    </div>
                </div>
            </div>
            </div>
            `;
            $("#data-content").append(template);
      });
  
    if (pokemonId == null) {
      alert("No se ha recibido el ID de pokemon");
    }
  });

/*<h3 class="text-center">Detalles del pokémon:</h3>
<div class="card mx-auto caja-ppal my-4">
<div class="card-header text-center ">
    <h5 class="card-title mb-0">Bulbasaur N°0001</h5>
</div>
<div class="card-body text-center">
    <div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt="Bulbasaur" class="img-fluid float-start fotoPokemon">
    </div>

    <ul class="list-group mt-3">
        <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Altura:</strong>
            0.7m</li>
        <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Categoria:
            </strong>Semilla</li>
        <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Peso:</strong>
            6.9kg</li>
    </ul>
    <div class="container-fluid">
        <h6 class="col-6 just">Ataques:</h6>
        <div class="col-12 btn-group borde-habilidades" role="group" aria-label="Ataques">
            <button type="button" class="btn btn-especial fw-bold">Derribo</button>
            <button type="button" class="btn btn-especial fw-bold">Somnífero</button>
            <button type="button" class="btn btn-especial fw-bold">Ver más</button>
        </div>
    </div>
</div>
<div class="card-footer">
    <div class="row text-center">
        <div class="col-12">
            <h6>Tipo</h6>
            <span class="badge bg-success">Planta</span>
            <span class="badge bg-danger">Veneno</span>
        </div>
    </div>
</div>
</div>*/