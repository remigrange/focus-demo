package rodolphe.demo.domain;

import java.util.Arrays;
import java.util.Iterator;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;

/**
 * Attention cette classe est générée automatiquement !
 */
public final class DtDefinitions implements Iterable<Class<?>> {
	
	/**
	 * Enumération des DtDefinitions.
	 */
	public enum Definitions {
			/** Objet de données FileInfo. */
			FileInfo(rodolphe.demo.domain.files.FileInfo.class),
			/** Objet de données Country. */
			Country(rodolphe.demo.domain.masterdatas.Country.class),
			/** Objet de données Genre. */
			Genre(rodolphe.demo.domain.masterdatas.Genre.class),
			/** Objet de données Language. */
			Language(rodolphe.demo.domain.masterdatas.Language.class),
			/** Objet de données RoleMovie. */
			RoleMovie(rodolphe.demo.domain.masterdatas.RoleMovie.class),
			/** Objet de données Title. */
			Title(rodolphe.demo.domain.masterdatas.Title.class),
			/** Objet de données Alias. */
			Alias(rodolphe.demo.domain.movies.Alias.class),
			/** Objet de données Movie. */
			Movie(rodolphe.demo.domain.movies.Movie.class),
			/** Objet de données MovieCriteria. */
			MovieCriteria(rodolphe.demo.domain.movies.MovieCriteria.class),
			/** Objet de données MovieIndex. */
			MovieIndex(rodolphe.demo.domain.movies.MovieIndex.class),
			/** Objet de données MovieResult. */
			MovieResult(rodolphe.demo.domain.movies.MovieResult.class),
			/** Objet de données MovieView. */
			MovieView(rodolphe.demo.domain.movies.MovieView.class),
			/** Objet de données SearchRet. */
			SearchRet(rodolphe.demo.domain.movies.SearchRet.class),
			/** Objet de données People. */
			People(rodolphe.demo.domain.people.People.class),
			/** Objet de données RolePeople. */
			RolePeople(rodolphe.demo.domain.people.RolePeople.class),
			/** Objet de données ApplicationUser. */
			ApplicationUser(rodolphe.demo.domain.users.ApplicationUser.class),
			/** Objet de données Profil. */
			Profil(rodolphe.demo.domain.users.Profil.class),
			/** Objet de données SecurityRole. */
			SecurityRole(rodolphe.demo.domain.users.SecurityRole.class),
			/** Objet de données UserAuthentification. */
			UserAuthentification(rodolphe.demo.domain.users.UserAuthentification.class),
		;
		
		private final Class<?> clazz;
		private Definitions(final Class<?> clazz) {
			this.clazz = clazz;
		}
		
		/** 
		  * Classe associée.
		  * @return Class d'implémentation de l'objet 
		  */
		public Class<?> getDtClass() {
			return clazz;
		}
    }

	/**
	 * Enumération des champs de FileInfo.
	 */
	public enum FileInfoFields implements DtFieldName {
		/** Propriété 'FIL_ID'. */
		FIL_ID,
		/** Propriété 'FILE_NAME'. */
		FILE_NAME,
		/** Propriété 'MIME_TYPE'. */
		MIME_TYPE,
		/** Propriété 'LENGTH'. */
		LENGTH,
		/** Propriété 'LAST_MODIFIED'. */
		LAST_MODIFIED,
		/** Propriété 'FILE_PATH'. */
		FILE_PATH,
	}

	/**
	 * Enumération des champs de Country.
	 */
	public enum CountryFields implements DtFieldName {
		/** Propriété 'COU_CD'. */
		COU_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de Genre.
	 */
	public enum GenreFields implements DtFieldName {
		/** Propriété 'GEN_CD'. */
		GEN_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de Language.
	 */
	public enum LanguageFields implements DtFieldName {
		/** Propriété 'LAN_CD'. */
		LAN_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de RoleMovie.
	 */
	public enum RoleMovieFields implements DtFieldName {
		/** Propriété 'RLM_CD'. */
		RLM_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de Title.
	 */
	public enum TitleFields implements DtFieldName {
		/** Propriété 'TIT_CD'. */
		TIT_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de Alias.
	 */
	public enum AliasFields implements DtFieldName {
		/** Propriété 'ALS_ID'. */
		ALS_ID,
		/** Propriété 'Title'. */
		TITLE,
		/** Propriété 'addition'. */
		ADDITION,
	}

	/**
	 * Enumération des champs de Movie.
	 */
	public enum MovieFields implements DtFieldName {
		/** Propriété 'MOV_ID'. */
		MOV_ID,
		/** Propriété 'TITLE'. */
		TITLE,
		/** Propriété 'Released'. */
		RELEASED,
		/** Propriété 'Runtime'. */
		RUNTIME,
		/** Propriété 'Description'. */
		DESCRIPTION,
		/** Propriété 'metadas Json'. */
		METADAS_JSON,
		/** Propriété 'imdbID'. */
		IMDBID,
	}

	/**
	 * Enumération des champs de MovieCriteria.
	 */
	public enum MovieCriteriaFields implements DtFieldName {
		/** Propriété 'primary key'. */
		MOV_ID,
		/** Propriété 'Title'. */
		TITLE,
		/** Propriété 'Released'. */
		RELEASED,
		/** Propriété 'Runtime'. */
		RUNTIME,
		/** Propriété 'Description'. */
		DESCRIPTION,
	}

	/**
	 * Enumération des champs de MovieIndex.
	 */
	public enum MovieIndexFields implements DtFieldName {
		/** Propriété 'primary key'. */
		MOV_ID,
		/** Propriété 'Title'. */
		TITLE,
		/** Propriété 'Released'. */
		RELEASED,
		/** Propriété 'Runtime'. */
		RUNTIME,
		/** Propriété 'Description'. */
		DESCRIPTION,
		/** Propriété 'Id imdb'. */
		IMDBID,
		/** Propriété 'rank'. */
		RANK,
	}

	/**
	 * Enumération des champs de MovieResult.
	 */
	public enum MovieResultFields implements DtFieldName {
		/** Propriété 'primary key'. */
		MOV_ID,
		/** Propriété 'Title'. */
		TITLE,
		/** Propriété 'Released'. */
		RELEASED,
		/** Propriété 'Runtime'. */
		RUNTIME,
		/** Propriété 'Description'. */
		DESCRIPTION,
		/** Propriété 'Meta Data JSON'. */
		METADAS_JSON,
		/** Propriété 'Id imdb'. */
		IMDBID,
	}

	/**
	 * Enumération des champs de MovieView.
	 */
	public enum MovieViewFields implements DtFieldName {
		/** Propriété 'primary key'. */
		MOV_ID,
		/** Propriété 'Title'. */
		TITLE,
		/** Propriété 'Released'. */
		RELEASED,
		/** Propriété 'Runtime'. */
		RUNTIME,
		/** Propriété 'Description'. */
		DESCRIPTION,
		/** Propriété 'Meta Data JSON'. */
		METADAS_JSON,
		/** Propriété 'Id imdb'. */
		IMDBID,
		/** Propriété 'rank'. */
		RANK,
	}

	/**
	 * Enumération des champs de SearchRet.
	 */
	public enum SearchRetFields implements DtFieldName {
		/** Propriété 'Type of the object'. */
		TYPE,
		/** Propriété 'Field 1'. */
		FIELD_1,
		/** Propriété 'Field 2'. */
		FIELD_2,
		/** Propriété 'Field 3'. */
		FIELD_3,
		/** Propriété 'Field 4'. */
		FIELD_4,
	}

	/**
	 * Enumération des champs de People.
	 */
	public enum PeopleFields implements DtFieldName {
		/** Propriété 'PEO_ID'. */
		PEO_ID,
		/** Propriété 'Last Name'. */
		LAST_NAME,
		/** Propriété 'First Name'. */
		FIRST_NAME,
		/** Propriété 'Peo Name'. */
		PEO_NAME,
		/** Propriété 'imdbID'. */
		IMDBID,
		/** Propriété 'Title'. */
		TIT_CD,
	}

	/**
	 * Enumération des champs de RolePeople.
	 */
	public enum RolePeopleFields implements DtFieldName {
		/** Propriété 'RLP_ID'. */
		RLP_ID,
		/** Propriété 'Role Name'. */
		ROLE_NAME,
		/** Propriété 'People'. */
		PEO_ID,
		/** Propriété 'Movie'. */
		MOV_ID,
		/** Propriété 'Role movie'. */
		RLM_CD,
	}

	/**
	 * Enumération des champs de ApplicationUser.
	 */
	public enum ApplicationUserFields implements DtFieldName {
		/** Propriété 'USR_ID'. */
		USR_ID,
		/** Propriété 'Last Name'. */
		LAST_NAME,
		/** Propriété 'First Name'. */
		FIRST_NAME,
		/** Propriété 'email'. */
		EMAIL,
		/** Propriété 'Profil'. */
		PRO_ID,
	}

	/**
	 * Enumération des champs de Profil.
	 */
	public enum ProfilFields implements DtFieldName {
		/** Propriété 'PRO_ID'. */
		PRO_ID,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de SecurityRole.
	 */
	public enum SecurityRoleFields implements DtFieldName {
		/** Propriété 'SRO_CD'. */
		SRO_CD,
		/** Propriété 'Label'. */
		LABEL,
	}

	/**
	 * Enumération des champs de UserAuthentification.
	 */
	public enum UserAuthentificationFields implements DtFieldName {
		/** Propriété 'AUTH_ID'. */
		AUTH_ID,
		/** Propriété 'Login'. */
		LOGIN,
		/** Propriété 'Password'. */
		PASSWORD,
		/** Propriété 'Application user'. */
		USR_ID,
	}

	    
    /** {@inheritDoc} */
    @Override
    public Iterator<Class<?>> iterator() {
        return new Iterator<Class<?>>() {
            private Iterator<Definitions> it = Arrays.asList(Definitions.values()).iterator();

            /** {@inheritDoc} */
            @Override
            public boolean hasNext() {
				return it.hasNext();
            }

            /** {@inheritDoc} */
            @Override
            public Class<?> next() {
            	return it.next().getDtClass();
            }

            /** {@inheritDoc} */
            @Override
            public void remove() {
            	//unsupported
            }
        };
    }                      
}