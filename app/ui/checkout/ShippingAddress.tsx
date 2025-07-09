"use client"
import React, { useState, useRef } from 'react';
import "../../globals.css";

const ShippingAddress = () => {
	const [region, setRegion] = useState("Kanto")
	const cityRef = useRef({
		city: ""
	})

	async function onRegionSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
		setRegion(e.target.options[e.target.selectedIndex].value)
	}

	async function onCitySelectChange(e: React.ChangeEvent<HTMLSelectElement>){
		cityRef.current = {
			city: e.target.options[e.target.selectedIndex].value
		}
	}

	return (
		<div className="flex flex-col border-2 border-black">
			<span className="font-bold">Shipping Address</span>
			<label htmlFor="select-region">Region</label>
			<select name="select-region" id="select-region" onChange={onRegionSelectChange}>
				<option value="Kanto">Kanto</option>
				<option value="Johto">Johto</option>
				<option value="Hoenn">Hoenn</option>
				<option value="Sinnoh">Sinnoh</option>
				<option value="Unova">Unova</option>
				<option value="Kalos">Kalos</option>
				<option value="Alola">Alola</option>
				<option value="Galar">Galar</option>
				<option value="Paldea">Paldea</option>
			</select>
			{
				region === "Kanto" && (
					<>
						<label htmlFor="select-kanto-city">City</label>
						<select name="select-kanto-city" id="select-kanto-city" onChange={onCitySelectChange}>
							<option value="Celadon City">Celadon City</option>
							<option value="Cerulean City">Cerulean City</option>
							<option value="Cinnabar Island">Cinnabar Island</option>
							<option value="Fuchsia City">Fuchsia City</option>
							<option value="Lavender Town">Lavender Town</option>
							<option value="Pallet Town">Pallet Town</option>
							<option value="Pewter City">Pewter City</option>
							<option value="Saffron City">Saffron City</option>
							<option value="Vermillion City">Vermillion City</option>
							<option value="Viridian City">Viridian City</option>
						</select>
					</>
				)
			}
			{
				region === "Johto" && (
					<>
						<label htmlFor="select-johto-city">City</label>
						<select name="select-johto-city" id="select-johto-city" onChange={onCitySelectChange}>
							<option value="Azalea Town">Azalea Town</option>
							<option value="Blackthorn City">Blackthorn City</option>
							<option value="Cianwood City">Cianwood City</option>
							<option value="Cherrygrove City">Cherrygrove City</option>
							<option value="Ecruteak City">Ecruteak City</option>
							<option value="Goldenrod City">Goldenrod City</option>
							<option value="Mahogany Town">Mahogany Town</option>
							<option value="New Bark Town">New Bark Town</option>
							<option value="Olivine City">Olivine City</option>
							<option value="Violet City">Violet City</option>
						</select>
					</>
				)
			}
			{
				region === "Hoenn" && (
					<>
						<label htmlFor="select-hoenn-city">City</label>
						<select name="select-hoenn-city" id="select-hoenn-city" onChange={onCitySelectChange}>
							<option value="Dewford Town">Dewford Town</option>
							<option value="Ever Grande City">Ever Grande City</option>
							<option value="Fallarbor Town">Fallarbor Town</option>
							<option value="Fortree City">Fortree City</option>
							<option value="Lavaridge Town">Lavaridge Town</option>
							<option value="Lilycove City">Lilycove City</option>
							<option value="Littleroot Town">Littleroot Town</option>
							<option value="Mauville City">Mauville City</option>
							<option value="Mossdeep City">Mossdeep City</option>
							<option value="Oldale Town">Oldale Town</option>
							<option value="Pacifidlog Town">Pacifidlog Town</option>
							<option value="Petalburg City">Petalburg City</option>
							<option value="Rustboro City">Rustboro City</option>
							<option value="Slateport City">Slateport City</option>
							<option value="Sootopolis City">Sootopolis City</option>
							<option value="Verdanturf Town">Verdanturf Town</option>
						</select>
					</>
				)
			}
			{
				region === "Sinnoh" && (
					<>
						<label htmlFor="select-sinnoh-city">City</label>
						<select name="select-sinnoh-city" id="select-sinnoh-city" onChange={onCitySelectChange}>
							<option value="Canalave City">Canalave City</option>
							<option value="Celestic Town">Celestic Town</option>
							<option value="Eterna City">Eterna City</option>
							<option value="Floaroma Town">Floaroma Town</option>
							<option value="Hearthome City">Hearthome City</option>
							<option value="Jubilife City">Jubilife City</option>
							<option value="Oreburgh City">Oreburgh City</option>
							<option value="Sandgem Town">Sandgem Town</option>
							<option value="Snowpoint City">Snowpoint City</option>
							<option value="Solaceon Town">Solaceon Town</option>
							<option value="Sunyshore City">Sunyshore City</option>
							<option value="Twinleaf Town">Twinleaf Town</option>
							<option value="Veilstone City">Veilstone City</option>
						</select>
					</>
				)
			}
			{
				region === "Unova" && (
					<>
						<label htmlFor="select-unova-city">City</label>
						<select name="select-unova-city" id="select-unova-city" onChange={onCitySelectChange}>
							<option value="Accumula Town">Accumula Town</option>
							<option value="Anville Town">Anville Town</option>
							<option value="Aspertia City">Aspertia City</option>
							<option value="Black City">Black City</option>
							<option value="Castelia City">Castelia City</option>
							<option value="Driftveil City">Driftveil City</option>
							<option value="Floccesy Town">Floccesy Town</option>
							<option value="Humilau City">Humilau City</option>
							<option value="Icirrus City">Icirrus City</option>
							<option value="Lacunosa Town">Lacunosa Town</option>
							<option value="Lentimas Town">Lentimas Town</option>
							<option value="Mistralton City">Mistralton City</option>
							<option value="Nacrene City">Nacrene City</option>
							<option value="Nimbasa City">Nimbasa City</option>
							<option value="Nuvema Town">Nuvema Town</option>
							<option value="Opelucid City">Opelucid City</option>
							<option value="Striaton City">Striaton City</option>
							<option value="Undella Town">Undella Town</option>
							<option value="Virbank City">Virbank City</option>
							<option value="White Forest">White Forest</option>
						</select>
					</>
				)
			}
				{
				region === "Kalos" && (
					<>
						<label htmlFor="select-kalos-city">City</label>
						<select name="select-kalos-city" id="select-kalos-city" onChange={onCitySelectChange}>
							<option value="Ambrette Town">Ambrette Town</option>
							<option value="Anistar City">Anistar City</option>
							<option value="Aquacorde Town">Aquacorde Town</option>
							<option value="Camphrier Town">Camphrier Town</option>
							<option value="Couriway Town">Couriway Town</option>
							<option value="Coumarine City">Coumarine City</option>
							<option value="Dendemille Town">Dendemille Town</option>
							<option value="Geosenge Town">Geosenge Town</option>
							<option value="Kiloude City">Kiloude City</option>
							<option value="Laverre City">Laverre City</option>
							<option value="Lumiose City">Lumiose City</option>
							<option value="Shalour City">Shalour City</option>
							<option value="Snowbelle City">Snowbelle City</option>
							<option value="Santalune City">Santalune City</option>
						</select>
					</>
				)
			}
			{
				region === "Alola" && (
					<>
						<label htmlFor="select-alola-city">City</label>
						<select name="select-alola-city" id="select-alola-city" onChange={onCitySelectChange}>
							<option value="Aether Paradise">Aether Paradise</option>
							<option value="Hau'oli City">Hau'oli City</option>
							<option value="Heahea City">Heahea City</option>
							<option value="Iki Town">Iki Town</option>
							<option value="Konikoni City">Konikoni City</option>
							<option value="Malie City">Malie City</option>
							<option value="Paniola Town">Paniola Town</option>
							<option value="Po Town">Po Town</option>
							<option value="Seafolk Village">Seafolk Village</option>
							<option value="Tapu Village">Tapu Village</option>
						</select>
					</>
				)
			}
			{
				region === "Galar" && (
					<>
						<label htmlFor="select-galar-city">City</label>
						<select name="select-galar-city" id="select-galar-city" onChange={onCitySelectChange}>
							<option value="Postwick">Postwick</option>
							<option value="Wedgehurst">Wedgehurst</option>
							<option value="Motostoke">Motostoke</option>
							<option value="Turffield">Turffield</option>
							<option value="Hulbury">Hulbury</option>
							<option value="Hammerlocke">Hammerlocke</option>
							<option value="Stow-on-Side">Stow-on-Side</option>
							<option value="Ballonlea">Ballonlea</option>
							<option value="Circhester">Circhester</option>
							<option value="Spikemuth">Spikemuth</option>
							<option value="Wyndon">Wyndon</option>
							<option value="Freezington">Freezington</option>
						</select>
					</>
				)
			}
			{
				region === "Paldea" && (
					<>
						<label htmlFor="select-paldea-city">City</label>
						<select name="select-paldea-city" id="select-paldea-city" onChange={onCitySelectChange}>
							<option value="Ballonlea">Ballonlea</option>
							<option value="Circhester">Circhester</option>
							<option value="Freezington">Freezington</option>
							<option value="Hammerlocke">Hammerlocke</option>
							<option value="Hulbury">Hulbury</option>
							<option value="Motostoke">Motostoke</option>
							<option value="Postwick">Postwick</option>
							<option value="Spikemuth">Spikemuth</option>
							<option value="Stow-on-Side">Stow-on-Side</option>
							<option value="Turffield">Turffield</option>
							<option value="Wedgehurst">Wedgehurst</option>
							<option value="Wyndon">Wyndon</option>
						</select>
					</>
				)
			}
		</div>
	)
}

export default ShippingAddress;