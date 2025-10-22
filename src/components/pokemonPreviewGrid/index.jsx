import { Row, Col, Card } from "antd";
import PokemonCard from "../pokemonCard";

function PokemonPreviewGrid({ pokemons, onSmallScreenCardClick, isPanelHidden }) {

    return (
        <div>
            <Row gutter={[16, 16]}>
                {pokemons.map((pokemon, index) => (
                    <Col xs={12} sm={12} md={8} lg={6} xl={6} key={index}>
                        <PokemonCard data={pokemon}
                            autoSelect={index === 0 && !isPanelHidden}
                            onSmallScreenCardClick={onSmallScreenCardClick} />

                    </Col>
                ))}

            </Row>
        </div>
    )
}
export default PokemonPreviewGrid