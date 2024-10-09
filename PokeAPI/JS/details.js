$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("id"));
    var pokemonId = urlParams.get("id");
    var nextPokemonId = (parseInt(pokemonId) + 1).toString();
    var prevPokemonId = (parseInt(pokemonId) - 1).toString();
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemonId,
        method: "GET",
      }).done(function (resp) {
          $("#data-content").html("");
          var typesHtml = '';
          var abilitiesHtml = '';
          var typeInfo = resp.types;
          var abilitiesList = resp.abilities;
          //debugger;
            typeInfo.forEach(function (typeInfo) {
            typesHtml += `<span class="badge bg-light text-dark">${capitalizeFirstLetter(typeInfo.type.name)}</span> `;
            //debugger;
            });
            
            abilitiesList.slice(0, 3).forEach(function (abilitiesList) {
                abilitiesHtml += `<button type="button" class="btn btn-especial fw-bold">${capitalizeFirstLetter(abilitiesList.ability.name)}</button>`;
                //debugger;
            });
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            var template = `
            <h3 class="text-center">Detalles del pokémon:</h3>

                <ul class="list-group mt-3">
                    <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Altura:</strong>
                        ${resp.height} cm</li>
                    <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Categoria:
                        </strong>${capitalizeFirstLetter(resp.species.name)}</li>
                    <li class="list-group-item mb-1 p-3 fs-6 stats" style="width: 100%;"><strong>Peso:</strong>
                        ${resp.weight} kg</li>
                </ul>
                <div class="container-fluid">
                    <h6 class="col-6 just mx-auto text-center">Ataques:</h6>
                    <div class="col-12 btn-group borde-habilidades" role="group" aria-label="Ataques">
                        ${abilitiesHtml}
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

            <div class="d-flex justify-content-between mt-3">
                ${pokemonId > 1 ? `<a href="poke-details.html?id=${prevPokemonId}" class="btn">Pokémon Anterior</a>` : '<div></div>'}
                <a href="poke-details.html?id=${nextPokemonId}" class="btn">Siguiente Pokémon</a>
            </div>
            `;
        $("#data-content").append(template);
    });

    if (pokemonId == null) {
        alert("No se ha recibido el ID de pokemon");
    }
});