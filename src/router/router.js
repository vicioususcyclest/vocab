import MainpageCon from '../containers/mainpageCon'
import AddvocabCon from '../containers/addvocabCon'
import HistoryCon from '../containers/historyCon'
import TestCon from '../containers/testCon'

import { Routes, Route, Navigate } from "react-router-dom"
// import My404Component from '../containers/404Con'

export default function router() {
    return (
        <Routes>
            {/* <Route path='*' element={<Navigate to="/404" replace />} />
            <Route path="/404" element={<My404Component />} /> */}
            <Route path='/home' element={<Navigate to="/" replace />} />
            <Route path="/" element={<MainpageCon />} />
            <Route path="/addvocab" element={<AddvocabCon />} />
            <Route path="/history/modify" element={<HistoryCon />} />
            <Route path="/test" element={<TestCon />} />
        </Routes>
    )
}