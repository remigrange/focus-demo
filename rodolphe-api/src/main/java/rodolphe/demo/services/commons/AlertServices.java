package rodolphe.demo.services.commons;

import io.vertigo.lang.Component;
import io.vertigo.persona.security.UserSession;

import java.util.List;

import rodolphe.demo.domain.commons.Alert;

public interface AlertServices extends Component {
	Alert get(long id);

	List<Alert> getAll(UserSession user);

	void accept(long id);

	long publish(final Alert alert);
}
