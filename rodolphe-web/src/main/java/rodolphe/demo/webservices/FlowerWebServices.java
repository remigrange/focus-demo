package rodolphe.demo.webservices;

import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.stereotype.AnonymousAccessAllowed;
import io.vertigo.vega.rest.stereotype.GET;
import io.vertigo.vega.rest.stereotype.PathParam;
import io.vertigo.vega.rest.stereotype.PathPrefix;

import java.util.List;

import javax.inject.Inject;

import rodolphe.demo.domain.Flower;
import rodolphe.demo.services.FlowerServices;

@PathPrefix("/flowers")
public class FlowerWebServices implements RestfulService {
	@Inject
	private FlowerServices flowerServices;

	@GET("/{id}")
	@AnonymousAccessAllowed
	public String helloWorldWithNumber(@PathParam("id") final int id) {
		return flowerServices.getFlowers().get(id).getName();
	}

	//
	//	@GET("/index")
	//	@AnonymousAccessAllowed
	//	public String helloWorld() {
	//		return "Hello world";
	//	}

	@AnonymousAccessAllowed
	@GET("/")
	public List<Flower> getFlowers() {
		return flowerServices.getFlowers();
	}

}
