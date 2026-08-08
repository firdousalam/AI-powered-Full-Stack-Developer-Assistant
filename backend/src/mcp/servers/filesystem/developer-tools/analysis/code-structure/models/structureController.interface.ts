/**
 * Represents a controller detected
 * inside the project source code.
 */
export interface StructureController {

    /**
     * Controller source file path
     * relative to the workspace.
     */
    path: string;

    /**
     * Controller class or function name.
     */
    name: string;

    /**
     * Methods exposed by the controller.
     */
    methods: string[];

}