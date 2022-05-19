package com.innowise.contract.tool.service;

import com.innowise.contract.tool.domain.Subcontract;
import com.innowise.contract.tool.repository.SubcontractRepository;
import com.innowise.contract.tool.service.dto.SubcontractDTO;
import com.innowise.contract.tool.service.mapper.SubcontractMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link Subcontract}.
 */
@Service
@Transactional
public class SubcontractService {

    private final Logger log = LoggerFactory.getLogger(SubcontractService.class);

    private final SubcontractRepository subcontractRepository;

    private final SubcontractMapper subcontractMapper;

    public SubcontractService(SubcontractRepository subcontractRepository, SubcontractMapper subcontractMapper) {
        this.subcontractRepository = subcontractRepository;
        this.subcontractMapper = subcontractMapper;
    }

    /**
     * Save a subcontract.
     *
     * @param subcontractDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<SubcontractDTO> save(SubcontractDTO subcontractDTO) {
        log.debug("Request to save Subcontract : {}", subcontractDTO);
        return subcontractRepository.save(subcontractMapper.toEntity(subcontractDTO)).map(subcontractMapper::toDto);
    }

    /**
     * Update a subcontract.
     *
     * @param subcontractDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<SubcontractDTO> update(SubcontractDTO subcontractDTO) {
        log.debug("Request to save Subcontract : {}", subcontractDTO);
        return subcontractRepository.save(subcontractMapper.toEntity(subcontractDTO)).map(subcontractMapper::toDto);
    }

    /**
     * Partially update a subcontract.
     *
     * @param subcontractDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<SubcontractDTO> partialUpdate(SubcontractDTO subcontractDTO) {
        log.debug("Request to partially update Subcontract : {}", subcontractDTO);

        return subcontractRepository
            .findById(subcontractDTO.getId())
            .map(existingSubcontract -> {
                subcontractMapper.partialUpdate(existingSubcontract, subcontractDTO);

                return existingSubcontract;
            })
            .flatMap(subcontractRepository::save)
            .map(subcontractMapper::toDto);
    }

    /**
     * Get all the subcontracts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Flux<SubcontractDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Subcontracts");
        return subcontractRepository.findAllBy(pageable).map(subcontractMapper::toDto);
    }

    /**
     * Returns the number of subcontracts available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return subcontractRepository.count();
    }

    /**
     * Get one subcontract by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Mono<SubcontractDTO> findOne(Long id) {
        log.debug("Request to get Subcontract : {}", id);
        return subcontractRepository.findById(id).map(subcontractMapper::toDto);
    }

    /**
     * Delete the subcontract by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Subcontract : {}", id);
        return subcontractRepository.deleteById(id);
    }
}
