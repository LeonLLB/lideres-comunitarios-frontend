import { Persona, PersonaCore } from "./persona";

export interface Seguidor extends Persona{}

export interface SeguidorDto extends PersonaCore{
    liderId: number
}