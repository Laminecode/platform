# 15-05-2024
- 


# 11-05-2024
- added a lot of methods to medels


# 08-05-2024
- modified a lot of how server_side is working, now it's more organized and easier to add new views
- added methods to `Config` class to get and set the date and boolean of soumission sujet
- added `get_soumission_sujet` and `set_soumission_sujet` views to get and set the date and boolean of soumission sujet and added the json documentation of the new views
- separated the views of creer encadreur interne and externe and etudiant in different urls
- added `get_full_object` method to all user models to get the full object from the current object
- added `get_sub_object` method to all user models to get the sub object from the current object
- changed `get` method in all user models to get the object by either getting it directly or getting it's parent object and then calling `get_sub_object` method
- added `pack_result` function to `utils` and replaced `pack_notification` and `pack_sujet` with it
- used set methods instead of direct attribute assignment in some views



# 05-05-2024
- changed the foreign key of `Sujet` to `SujetEncadreur` in `Etudiant` model to be able to remove `Sujet` model
- changed `PFE` attribute in `Etudiant` model related name to `etudiant`
- renamed the `etat` attribute in `SujetEncaedreur` model to `disponibile`
- changed `get_PFE` to `get_etudiant` where it's used in the views
- changed `creer_sujet` view to only check if the title exists in the same encadreur sujets
- added `get_palier` method to `SujetEncadreur` model
- modifed `modifier_sujet` and `supprimer_sujet` view to get the sujet by its id
- commented `get_encadreur` view until it's needed
- added some methods to Etudiant to get, add, remove sujet and encadreur from favoris and liste de choix and modified views to use them
- changed the `get` class method in `SujetEncadreur` model to get the object by its id
- modified the supprimer and add favoris and liste de choix views to use the new methods in the models
- modified the `is_able_to_add_to_liste_de_choix` and `get_pfe` and `suggerer_sujet` views to use the `get_PFE` method in the `Etudiant` model
- changed the `email` to `user_id` in all jsons that request an encadreur
- fixed `nom` to `username` in the `match_encadreur` function
- added `get_palier` and `set_palier` methods to `Etudiant` model
- changed `suggerer_sujet` to use `get_palier` method of `Etudiant` model
- added `Tencadreur`, `TencadreurExerne`, `TencadreurInterne` models to be used in the future instead of `Encadreur` model


# 04-05-2024
- fixed the `creer_sujet` view to check if the with the same title already exists
- added `.save()` to `SujetEncadreur` model to save the parent object correctly
- added new file `test.py` that contains views for testing purposes
- fixed `get_pfe` method on `Sujet` model to work when no student is assigned
- added the `get` method to the `Administateur` model to get the admin by its user id, and changed `prenom` and `nom` to `username` 
- added `set_notification_lu` view to set the notification as seen
- removed some unecessary prints in the views
- added the `get_encadreur` view to get the encadreur of a sujet
- added `type` to the json of encadreur in Doc/JSON/used.md



# 02-05-2024
- fixed `suggerer_sujet` view to work
- changed `secret_key` to be saved in a file 
- changed some functions in server side to consider the returned json format
 


# 01-05-2024
- fixed `get_sujet` view to work
- changed secret key to be generated for every user
- changed the format of the json sent from the backend to the frontend to include the status code
- created a `gen_response` function to generate the json to be sent to the frontend
- added space between the `nom` and `prenom` in signin view
- changed all the `JsonResponse` to `gerenrate_json_response` in the views



# 27-04-2024
- added new statistics to the `get_statistics` view
- fixed minor bug in `rechercher_sujet` view not returning the filtered subjects
- fixed `plaier` to `palier` in the `rechercher_sujet` json documentation
- added `launch_affectation_automatique` view to launch the affectation process manually but not working yet
- fixed the `launch_affectation_automatique` view 
- added the `get_affectation_automatique_status` view to urls 

# 25-04-2024
- added the `search_sujet_here` attribute to the `Etudiant` model
- added the new attribute to the json for get and set profil of etudiant
- modified the get and set profil view of etudiant to include the new attribute 
- modified the `affectation_automatique` view to check if the student is concerned by the affectation



# 23-04-2024
- fixed `get_outils` and `get_domaines` methods to return empty list if the user has no outils or domaines
- removed the `nom` and `prenom` attributes from the json of the `set_profil` views
- fixed `supprimer_sujet` view to actually delete the sujet
- added the delete views for etudiant and encadreur
- modified the `secret_key` in the `utils` to be generated only once and saved to congif file


# 11-04-2024
- renamed the `id` method to `get` in the models
- removed some unecessary imports in the views
- added the `tested urls` file to the `Doc` folder to list the urls that have been tested
- changed the secret_key in the utils file to be a static string for testing purposes
- corrected the `preferences` key to `expertises` in the `set_profil_encadreur` view


# 09-04-2024
- added some getters and setters to the models to only use them to get and set the attributes
- changed the json of `login` where renamed `email` to `user_id` and made it only return the `session` part
- added the `get_profil_etudiant` and `get_profil_encadreur` views to get the profile of the user 
- modfied the `email` attribute to `user_id` in the `encadreur` json in used
- added `etudiant` json to used
- add the `get_etudiant` view for encadreur to get all the students that have a PFE with him


# 05-04-2024
- implemented the `gen_auth_token` and the `check_auth_token` functions
- changed the `login` json doc to include the `session`
- modified the `is_able_to_add_to_liste_de_choix` view to check if the student has already a PFE from previous sessions
- modified a bunch of views to get the user id correctly
- rewrote all the server side code, fully functional now
- added `post_auth` function in server_side to handle the post requests


# 04-04-2024
- modified and added some attributes in the models
- added statistic file that contains views for getting the statistics
- added session attr to the config file with the related views to get and set the session
- mofified the `set_date_affectation_automatique` view to check if the session is active
- added the `is_able_to_add_to_liste_de_choix` view to get if the student is able to add to the list 
- added the corresponding json documentation for the new views
- added the `get_notifications` view for getting the notifications of the user
- added more rules to the `Rules.md` file




# 04-03-2024
- created `supprimer_sujet` for encadreur
- added more json documentation for new views 
- changed the urls of views
- added all the views of the `gerer_sujet_et_encadreur` section for etdudiant
- added `get_date_affectation_automatique` view
- added `js/script.js` for utility functions and classes
- created `RamziTest` folder in UI for testing new components by ramzi while learning react

# 02-04-2024
- Added `run.py` file that should be run from the `Server` directory, it launches all the neccessary processes
- added `set_date_affectation_automatique` view
- added some attributes to `Etudiant` model
- created the `affectation_automatique` function
- added some `creer_sujet` and `modifer_sujet` for Encadreur 
- added the related json documentation of the new views
- added setters for sujet models
- changed `type` to `child_type` in `create` method in models



# 31-03-2024
- moved all the files from ALTER `UI/frontend` to `UI`
- added `id()` method to user models to get user from it's user id, not database id
- added `Data` class to encapsulate json data from ui 
- created the `gerer_profil_etudiant` and `gerer_profil_encadreur` functions
- create the `get_sujet` function for encadreur
- added all current functions urls


# 30-03-2024
- created the `suggerer_sujet` et `suggerer_encadereur` views
- Added `Test` folder for testing
- modified the structure of the exchanged json between front and back
- added new decorators
- fixed the `rehcercher` methods


# 29-03-2024
- Added `dict` method for all models to add the object attributes to a dictionary, or create a new one if nothing passed
- modified `rehchercher` and related methods so they don't work now
- created `JSON` folder to specify the structure of the `json` objects exchanged between backend and frontend
- moved the content of `UI` to `ALTER UI` folder to let lamine add his UI
- created `Views` folder to organize the views
- created the `login` and `signin` views


# 27-03-2024
- changed the json format to use arrays instead of numbered objects
- fixed the text overflow in search result cards
- added filtering of encadreur results by domains and outils
- chaned the filter options in Rechercher section to be queried from backend
- added methods for sujet and encadreur models to get domains and outils as lists 

# 27-03-2024
- created the first version of the main application ui
- created the first version of the search ui
- created the `Database` folder containing the queries and scripts to fill the database
- added more components to the `Component.js` file
- fixed the models having issues with inheritance and attributes
- created `Test` folder for testing ui elements 
- created views for getting the the sujet and encadreur using some filtering



# 20-03-2024
- added more methods to the `ELEM` class in DOMBindings for css class handling
- added `Img` class and `create_img` function DOMBindings


# 19-03-2024
- modified the models for inheritance correctness
- 


# 17-03-2024
- started creating the main app UI 

# 16-03-2024
- created the models
- changed attributes int the models 
- changed the trusted domain in settings to localhost:5501


# 15-03-2024
- configured the allowed origins in settings to `loacalhost:5500`
- finished configuring the database settings
- added the essentiel informations to create the user and database in `database.md`
- created `Request.js` for api request functions
- renamed `Modules.js` to `DOMBindings.js`, and moved all general library files into `Lib` folder 
- added `tools.md` to list the tools to download


# 14-03-2024
- created `login` and `sign` page ui with javascript
- created `validation.js` for commun validation functions
- created the django project, Platform app, and configured the cors and database settings
- created the github repository