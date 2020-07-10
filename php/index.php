<?php

$data = [];
$result = [];

$url = [
    'confirmed' => 'https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_confirmed.csv',
    'deaths' => 'https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_deaths.csv',
    'recovered' => 'https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_recoveries.csv',
];

$provinces = [
    'EC' => 'Eastern Cape',
    'FS' => 'Free State',
    'GP' => 'Gauteng',
    'KZN' => 'KwaZulu-Natal',
    'LP' => 'Limpopo',
    'MP' => 'Mpumalanga',
    'NC' => 'Northern Cape',
    'NW' => 'North West',
    'WC' => 'Western Cape',
];

foreach(['confirmed', 'deaths', 'recovered'] as $type) {
    $csv = file_get_contents($url[$type]);
    $array = array_map("str_getcsv", explode("\n", $csv));
    $data[$type] = $array;
}

function find_index_for_date($array, $date) {
    foreach($array as $k => $v) {
        if($v[1] == $date) {
            return $k;
        }
    }
}

$i = 2;
foreach($provinces as $code => $province) {
    $result[$province] = [];
    $last_confirmed = -1;
    $last_deaths = -1;
    $last_recovered = -1;

    foreach(['confirmed'] as $type) {
        foreach($data[$type] as $k => $row) {
            if($k > 0 && $row[1] > 20200329) {
                $confirmed = intval($row[$i]);
                $deaths = intval($data['deaths'][find_index_for_date($data['deaths'], $row[1])][$i]);
                $recovered = intval($data['recovered'][find_index_for_date($data['recovered'], $row[1])][$i]);

                if($last_deaths > $deaths) $deaths = $last_deaths;
                if($last_deaths > $deaths) $deaths = $last_deaths;
                if($last_recovered > $recovered) $recovered = $last_recovered;

                if($confirmed > $last_confirmed) $last_confirmed = $confirmed;
                if($deaths > $last_deaths) $last_deaths = $deaths;
                if($recovered > $last_recovered) $last_recovered = $recovered;

                $result[$province][] = [
                    'date' => $row[0],
                    'confirmed' => $confirmed,
                    'deaths' => $deaths,
                    'recovered' => $recovered,
                ];
            }
        }
    }

    $i++;
}

file_put_contents('/home/forge/coronaviewer.co.za/src/data/timeseries.json', json_encode($result));

?>