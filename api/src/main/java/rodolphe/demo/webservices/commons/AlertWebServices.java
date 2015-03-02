package rodolphe.demo.webservices.commons;

import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.POST;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;

import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.domain.commons.Alert;
import rodolphe.demo.services.commons.AlertServices;

@PathPrefix("/alerts")
public class AlertWebServices implements RestfulService {
	@Inject
	private AlertServices alertServices;

	@GET("/{id}")
	@AnonymousAccessAllowed
	public Alert helloWorldWithNumber(@PathParam("id") final int id) {
		return alertServices.get(id);
	}

	@AnonymousAccessAllowed
	@GET("/")
	public List<Alert> getAlerts() {
		return alertServices.getAll(null);
	}

	@POST("/")
	@AnonymousAccessAllowed
	public long publishAlert(final Alert alert) {
		return alertServices.publish(alert);
	}

	@AnonymousAccessAllowed
	@POST("/{id}/accept")
	public void acceptAlert(@PathParam("id") final int id) {
		alertServices.accept(id);
	}
}
