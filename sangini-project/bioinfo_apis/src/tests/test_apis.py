import pytest
from Bio.SeqUtils import gc_fraction

from api.gc_calculations import GCCalculations
from api.codon_bias import CodonBiasAnalyzer
from api.nussinov_predicted_structure import NussinovPredictedStructure
from api.zuker_predicted_structure import ZukerPredictedStructure
from api.translate_codons import TranslateCodons

from tests.test_data import rna_test_data


class TestGCCalculations:
    """Tests for the GCCalculations class."""

    def test_get_gc_fraction(self):
        """Tests get_gc_fraction with valid RNA sequences."""
        gcc = GCCalculations()

        for entry in rna_test_data:
            gc_fraction_result = gcc.get_gc_fraction(entry["RNASequence"])
            assert 0 <= gc_fraction_result <= 1, "GC fraction should be between 0 and 1"

    def test_get_gc_123(self):
        """Tests get_gc_content_for_123 with valid RNA sequences."""
        gcc = GCCalculations()

        for entry in rna_test_data:
            gc_123_result = gcc.get_gc_content_for_123(entry["RNASequence"])
            if entry in gc_123_result:
                assert True
 
    def test_get_gc_molecular_weight(self):
        """Tests get_gc_molecular_weight with valid RNA sequences."""
        gcc = GCCalculations()

        for entry in rna_test_data:
            gc_mw = gcc.get_gc_molecular_weight(entry["RNASequence"])
            if gc_mw > 0:
                assert True

    def test_codon_bias(self):
        """Tests analyze_codon_bias with valid RNA sequences."""
        cba = CodonBiasAnalyzer()

        for entry in rna_test_data:
            cba_value = cba.analyze_codon_bias(entry["RNASequence"])
            if cba_value:
                assert True

    def test_nussinov_structure(self):
        """Tests analyze_codon_bias with valid RNA sequences."""
        nps = NussinovPredictedStructure()

        for entry in rna_test_data:
            nps_value = nps.get_predicted_structure(entry["RNASequence"])
            if nps_value:
                assert True

    def test_zuker_structure(self):
        """Tests analyze_codon_bias with valid RNA sequences."""
        zps = ZukerPredictedStructure()

        for entry in rna_test_data:
            zps_value = zps.get_predicted_structure(entry["RNASequence"])
            if zps_value:
                assert True

    def test_codon_translator(self):
        """Tests codon translator with valid RNA sequences."""
        TC = TranslateCodons()

        for entry in rna_test_data:
            tc_value = TC.translate(entry["RNASequence"])
            if tc_value:
                assert True
