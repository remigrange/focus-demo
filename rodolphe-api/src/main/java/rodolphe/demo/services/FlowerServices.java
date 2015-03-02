package rodolphe.demo.services;

import io.vertigo.lang.Component;

import java.util.List;

import rodolphe.demo.domain.Flower;

public interface FlowerServices extends Component {
	List<Flower> getFlowers();
}
