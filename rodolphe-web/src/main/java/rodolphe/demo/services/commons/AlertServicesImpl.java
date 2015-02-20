package rodolphe.demo.services.commons;

import io.vertigo.lang.Assertion;
import io.vertigo.persona.security.UserSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import rodolphe.demo.domain.commons.Alert;

public final class AlertServicesImpl implements AlertServices {
	private final Map<Long, Alert> alerts = new HashMap<>();
	private long currentId = 0L;

	public AlertServicesImpl() {
		final Alert alert = new Alert();
		alert.setMsg("test");
		alert.setCode("CD");
		//-----
		publish(alert);
	}

	private synchronized long nextId() {
		return currentId++;
	}

	@Override
	public List<Alert> getAll(final UserSession user) {
		//		Assertion.checkNotNull(alert);
		//		//-----
		return new ArrayList<>(alerts.values());
	}

	@Override
	public void accept(final long id) {
		alerts.remove(id);
	}

	@Override
	public long publish(final Alert alert) {
		Assertion.checkNotNull(alert);
		//-----
		final long id = nextId();
		alert.setId(id);
		alerts.put(id, alert);
		return id;
	}

	@Override
	public Alert get(final long id) {
		return alerts.get(id);
	}
}
